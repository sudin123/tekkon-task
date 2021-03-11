"use strict";
const schema = require("../schemas/messages");
const validator = require("../utils/validator");

module.exports = {
  async create(inputs) {
    try {
      await validator.message(inputs);
      return await schema.create(inputs);
    } catch (e) {
      throw e;
    }
  },

  async get(query) {
    try {
    //   await validator.fetchChat(query);
      //user validation is requried
      return await schema
        .find(query)
        .sort({
          created_at: "ascending",
        })
        .lean();
    } catch (e) {
      throw e;
    }
  },
};
