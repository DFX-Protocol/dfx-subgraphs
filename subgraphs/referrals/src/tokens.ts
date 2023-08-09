import { TOKENS, PRICE_FEEDS, DECIMALS } from "./config";

export function getTokenByPriceFeed(priceFeed: string): string[] {
  for(let i = 0; i < PRICE_FEEDS.length; i++) {
    if(PRICE_FEEDS[i] == priceFeed) {
      return [TOKENS[i]];
    }
  }
  return [];
}

export function getTokenDecimals(tokenAddress: string): number {
  for(let i = 0; i < TOKENS.length; i++) {
    if(TOKENS[i] == tokenAddress) {
      return DECIMALS[i];
    }
  }
  return 0;
}
