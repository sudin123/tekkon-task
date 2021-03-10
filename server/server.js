require("dotenv").config();

const { ApolloServer } = require("apollo-server");
const typeDefs = require("./src/graphql/typeDefs");
const resolvers = require("./src/graphql/resolver");
const mongoose = require("mongoose");
const contextLayer = require("./src/utils/context_layer");
const errorFormatter = require("./src/utils/error_formatter");

/**
 * * mongoDB database connection
 */
mongoose.connect(
  process.env.NODE_ENV == "test"
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: process.env.NODE_ENV == "production" ? false : true,
  formatError: errorFormatter,
  context: contextLayer,
});

server.listen({ port: process.env.SERVER_PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
