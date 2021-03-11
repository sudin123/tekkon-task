"use strict";

const { validator } = require("indicative");
const { ValidationError } = require("apollo-server-errors");

module.exports = {
  async user(inputs) {
    try {
      let rules = {
        email: "required|email",
        name: "required|min:4",
        password: "required|confirmed|min:6",
      };
      let messages = {
        "name.required": "Name is required",
        "name.min": "Name should be at least 4 characters long",
        "email.required": "Email is required",
        "email.email": "Email is invalid",
        "password.required": "Password is required",
        "password.confirmed": "Password dont match",
        "password.min": "Password must have at least 6 characters",
      };
      return await validator.validateAll(inputs, rules, messages);
    } catch (e) {
      throw new ValidationError(JSON.stringify(e));
    }
  },

  async login(inputs) {
    try {
      let rules = {
        email: "required|email",
        password: "required",
      };
      let messages = {
        "email.required": "Email is required",
        "email.email": "Email is invalid",
        "password.required": "Password is required",
      };
      return await validator.validateAll(inputs, rules, messages);
    } catch (e) {
      throw new ValidationError(JSON.stringify(e));
    }
  },

  async chat(inputs) {
    try {
      let rules = {
        userId: "required",
        authId: "required",
      };
      let messages = {
        "userId.required": "Insufficient Information",
        "authId.required": "Insufficient Information",
      };
      return await validator.validateAll(inputs, rules, messages);
    } catch (e) {
      throw new ValidationError(JSON.stringify(e));
    }
  },

  async message(inputs) {
    try {
      let rules = {
        message: "required",
        sender_id: "required",
        chat_id: "required",
      };
      let messages = {
        "message.required": "Message is required",
        "sender_id.required": "Sender Information is requried",
        "chat_id.required": "Chat Information is required",
      };
      return await validator.validateAll(inputs, rules, messages);
    } catch (e) {
      throw new ValidationError(JSON.stringify(e));
    }
  },
};
