const user = require("../../models/user.model");

module.exports = {
  Query: {
    users: async (_, __, {}) => {
      try {
        return await user.getUsers();
      } catch (e) {
        throw e;
      }
    },
  },

  Mutation: {
    register: (_, args) => {
      return args;
    },
    login: (_, args, { pubsub }) => {
      pubsub.publish("NEW_USER", { newUser: { name: "New User" } });
      return args;
    },
  },

  Subscription: {
    newUser: {
      subscribe: (_, __, { pubsub }) => {
        return pubsub.asyncIterator("NEW_USER");
      },
    },
  },
};
