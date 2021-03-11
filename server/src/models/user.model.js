"use strict";
const schema = require("../schemas/user");
const validator = require("../utils/validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-errors");

module.exports = {
  async login(inputs) {
    try {
      await validator.login(inputs);
      let user = await schema.findOne({ email: inputs.email });

      if (user == null) {
        throw new Error("User not Found");
      }

      let isPasswordCorrect = await bcrypt.compare(
        inputs.password,
        user.password
      );

      if (isPasswordCorrect) {
        delete user.password;
        user.access_token = jwt.sign(
          { user: user },
          process.env.JWT_SECRET_KEY
        );
        return user;
      }

      throw new AuthenticationError("Email or Password doesnot match");
    } catch (e) {
      throw e;
    }
  },

  async createUser(inputs) {
    try {
      await validator.user(inputs);
      inputs.password = await bcrypt.hash(inputs.password, saltRounds);
      let res = await schema.create(inputs);
      delete res.password;
      res.access_token = jwt.sign({ user: res }, process.env.JWT_SECRET_KEY);
      return res;
    } catch (e) {
      throw e;
    }
  },

  async getUsers(query, authUser) {
    try {
      return await schema
        .find(query)
        .sort({
          is_online: "descending",
        })
        .lean();
    } catch (e) {
      throw e;
    }
  },

  /**
   *
   * @param {Object} query
   * @param {Object} inputs
   */
  async update(query, updates) {
    try {
      return await schema.findOneAndUpdate(query, updates);
    } catch (e) {
      throw e;
    }
  },

  async findOneByQuery(query) {
    try {
      return await schema.findOne(query);
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
};
