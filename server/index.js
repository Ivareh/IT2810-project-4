// Not typescript, because we got some issues with require functions.
const {Neo4jGraphQL} = require("@neo4j/graphql")
const {ApolloServer} = require("apollo-server")
const neo4j = require("neo4j-driver")
const typeDefs = require("./schema")

/**
 * Create a new Neo4j driver instance to connect to our database
 * @type {Driver}
 */
const driver = neo4j.driver(
  "neo4j://it2810-62.idi.ntnu.no:7687",
  neo4j.auth.basic("neo4j", "mOJxKdRJ964UZGR8-DPAkRjLVRcHO6c7M6LYRSEIusY")
);

/**
 * Create a new Neo4jGraphQL instance, and pass our type definitions
 * to it along with the driver.
 */
const neo4jGraphQL = new Neo4jGraphQL({
  typeDefs,
  driver
});

/**
 *  Get finished schema and resolver functions from Neo4jGraphQL and pass
 *  them to the Apollo server.
 */
neo4jGraphQL.getSchema().then((schema) => {
  // Create ApolloServer instance to serve GraphQL schema
  const server = new ApolloServer({
      schema,
      context: {driverConfig: {database: 'neo4j'}}
  });

  // Start ApolloServer
  server.listen().then(({url}) => {
      console.log(`GraphQL server ready at ${url}`);
  });
});

