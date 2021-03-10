const user = require("../../models/user.model");

module.exports = {
  Query: {
    users: async (_, __, context) => {
      try {
        console.log(context.test_data);
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
    login: (_, args) => {
      return args;
    },
  },
};
