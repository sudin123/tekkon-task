const user = require("../../models/user.model");
const { checkAuth } = require("../../utils/checkAuth");

module.exports = {
  Query: {
    users: async (_, __, { authUser }) => {
      try {
        checkAuth(authUser);
        return await user.getUsers({ _id: { $ne: authUser._id } });
      } catch (e) {
        throw e;
      }
    },
  },

  Mutation: {
    register: async (_, args, { pubsub }) => {
      try {
        let res = await user.createUser(args);
        pubsub.publish("REFRESH_USERS", { refreshUsers: {} });
        return res;
      } catch (e) {
        throw e;
      }
    },
    login: async (_, args, { pubsub }) => {
      try {
        let res = await user.login(args);
        pubsub.publish("REFRESH_USERS", { refreshUsers: {} });
        return res;
      } catch (e) {
        throw e;
      }
    },
    toggleOnlineStatus: async (_, args, { pubsub, authUser }) => {
      try {
        checkAuth(authUser);
        let res = await user.update({ _id: authUser._id }, args);
        pubsub.publish("REFRESH_USERS", { refreshUsers: {} });
        return res;
      } catch (e) {
        throw e;
      }
    },
  },

  Subscription: {
    refreshUsers: {
      subscribe: (_, __, { pubsub }) => {
        return pubsub.asyncIterator("REFRESH_USERS");
      },
    },
  },
};
