import { BigInt, TypedMap } from "@graphprotocol/graph-ts"
import {
  ChainlinkPrice,
  UniswapPrice
} from "../generated/schema"
import {
  WETH,
  BTC,
  LINK,
  // UNI,
  // MIM,
  // SPELL,
  // SUSHI,
  USDT,
  USDC,
  DAI,
  GMX,
  tokenDecimals
} from "./config";
export let BASIS_POINTS_DIVISOR = BigInt.fromI32(10000)
export let PRECISION = BigInt.fromI32(10).pow(30)


export function timestampToDay(timestamp: BigInt): BigInt {
  return timestamp / BigInt.fromI32(86400) * BigInt.fromI32(86400)
}

export function timestampToPeriod(timestamp: BigInt, period: string): BigInt {
  let periodTime: BigInt

  if (period == "daily") {
    periodTime = BigInt.fromI32(86400)
  } else if (period == "hourly") {
    periodTime = BigInt.fromI32(3600)
  } else if (period == "weekly" ){
    periodTime = BigInt.fromI32(86400 * 7)
  } else {
    throw new Error("Unsupported period " + period)
  }

  return timestamp / periodTime * periodTime
}


export function getTokenDecimals(token: String): u8 {
  return tokenDecimals.get(token) as u8
}

export function getTokenAmountUsd(token: String, amount: BigInt): BigInt {
  let decimals = getTokenDecimals(token)
  let denominator = BigInt.fromI32(10).pow(decimals)
  let price = getTokenPrice(token)
  return amount * price / denominator
}

export function getTokenPrice(token: String): BigInt {
  if (token != GMX) {
    let chainlinkPriceEntity = ChainlinkPrice.load(token)
    if (chainlinkPriceEntity != null) {
      // all chainlink prices have 8 decimals
      // adjusting them to fit GMX 30 decimals USD values
      return chainlinkPriceEntity.value * BigInt.fromI32(10).pow(22)
    }
  }

  if (token == GMX) {
    let uniswapPriceEntity = UniswapPrice.load(GMX)

    if (uniswapPriceEntity != null) {
      return uniswapPriceEntity.value
    }
  }

  let prices = new TypedMap<String, BigInt>()
  prices.set(WETH, BigInt.fromI32(3350) * PRECISION)
  prices.set(BTC, BigInt.fromI32(45000) * PRECISION)
  prices.set(LINK, BigInt.fromI32(25) * PRECISION)
  // prices.set(UNI, BigInt.fromI32(23) * PRECISION)
  prices.set(USDC, PRECISION)
  // prices.set(USDCe, PRECISION)
  prices.set(USDT, PRECISION)
  // prices.set(MIM, PRECISION)
  // prices.set(SPELL, PRECISION / BigInt.fromI32(50)) // ~2 cents
  // prices.set(SUSHI, BigInt.fromI32(10) * PRECISION)
  // prices.set(FRAX, PRECISION)
  prices.set(DAI, PRECISION)
  prices.set(GMX, BigInt.fromI32(30) * PRECISION)

  return prices.get(token) as BigInt
}
