## To setup and deploy

For any of the subgraphs follow below steps
1. Update all addresses in config/[network_name].json with deployed contract addresses.
2. CD in to the subgraph directory `subgraphs:[subgraphName]`
3. Run the `yarn run prepare:[network]` to prepare yaml file from template.yaml and network specific data.
4. Run the `yarn run codegen` command to prepare the TypeScript sources for the GraphQL (generated/schema) and the ABIs (generated/[ABI]/\*)
5. [Optional] run the `yarn run build` command to build the subgraph. Can be used to check compile errors before deploying.
6. To deploy on local. do the following
    1. At project root, run `docker-compose up -d`
    2. Once container is up, run `yarn run create-local` in subgraph directory `subgraphs:[subgraphName]`
    3. A new subgraph will be created. Once done, run `yarn run deploy-local`.
    4. Monitor docker logs for data syncing with blockchain.
7. To deploy on live, do the following
    1. Run graph auth https://api.thegraph.com/deploy/ <ACCESS_TOKEN>
    2. Deploy via `yarn run deploy`.
