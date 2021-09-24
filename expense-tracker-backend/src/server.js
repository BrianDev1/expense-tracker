const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const dotenv = require("dotenv");
const DatabaseConnection = require("./config/database");

const startApolloServer = async () => {
  dotenv.config();
  const app = express();
  DatabaseConnection(process.env.MONGODB_URI);
  const PORT = process.env.PORT || 4000;

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start(); // Required on new v3 of apollo-server

  server.applyMiddleware({ app });

  app.listen(PORT, () =>
    console.log(`Express Server running on port ${PORT} ${server.graphqlPath}`)
  );
};

startApolloServer();
