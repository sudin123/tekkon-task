"use strict";
const schema = require("../schemas/user");

module.exports = {
  async getUsers() {
    try {
      return await schema.find({});
    } catch (e) {
      throw e;
    }
  },
};
