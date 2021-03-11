"use strict";
const schema = require("../schemas/chat");
const validator = require("../utils/validator");
const userModel = require("../models/user.model");

module.exports = {
  async findOne(query) {
    try {
      await validator.chat(query);
      let { userId, authId } = query;
      let data = {
        user1_id: userId,
        user2_id: authId,
      };
      let chat = await schema.findOne(data);
      if (chat == null) {
        data.user1_id = authId;
        data.user2_id = userId;
        chat = await schema.findOne(data);
      }
      if (chat == null) {
        chat = await schema.create(data);
      }
      chat.user = await userModel.findOneByQuery({ _id: userId });
      return chat;
    } catch (e) {
      throw e;
    }
  },
};
