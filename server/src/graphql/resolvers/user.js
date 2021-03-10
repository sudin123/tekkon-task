const user = require("../../models/user.model");
module.exports = {
  users: async (_, __, context) => {
    try {
      console.log(context.test_data);
      return await user.getUsers();
    } catch (e) {
      throw e;
    }
  },
};
