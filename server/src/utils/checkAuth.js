"use strict";
const { AuthenticationError } = require("apollo-server-errors");

module.exports = {
  checkAuth(authUser) {
    if (authUser && `_id` in authUser) {
      return true;
    }
    throw new AuthenticationError("Unauthenticated");
  },
};
