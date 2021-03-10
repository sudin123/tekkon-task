const userResolvers = require("./resolvers/user");
module.exports = {
  Query: {
    info: () => "Tekkon Simple Chat App task",
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation
  }
};
