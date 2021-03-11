const userResolvers = require("./resolvers/user");
const chatResolvers = require("./resolvers/chat");
module.exports = {
  Query: {
    info: () => "Tekkon Simple Chat App task",
    ...userResolvers.Query,
    ...chatResolvers.Query,
  },

  Mutation: {
    ...userResolvers.Mutation,
    ...chatResolvers.Mutation,
  },

  Subscription: {
    ...userResolvers.Subscription,
    ...chatResolvers.Subscription,
  },
};
