const user = require("../../models/user.model");
const { checkAuth } = require("../../utils/checkAuth");

module.exports = {
  Query: {
    users: async (_, __, { authUser }) => {
      try {
        checkAuth(authUser);
        return await user.getUsers(authUser);
      } catch (e) {
        throw e;
      }
    },
  },

  Mutation: {
    register: async (_, args, { pubsub }) => {
      try {
        let res = await user.createUser(args);
        pubsub.publish("NEW_USER", { newUser: res });
        return res;
      } catch (e) {
        throw e;
      }
    },
    login: async (_, args, { pubsub }) => {
      try {
        let res = await user.login(args);
        pubsub.publish("NEW_USER", { newUser: { name: "New User" } });
        return res;
      } catch (e) {
        throw e;
      }
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
