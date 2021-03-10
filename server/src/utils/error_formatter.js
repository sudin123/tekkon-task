"use strict";

const { AuthenticationError } = require("apollo-server-errors");

module.exports = (err) => {
  if (process.env.NODE_ENV == "development") {
    throw err;
  }
  
  /**
   * * hiding detail info for production use
   */
  if (err.extensions.code == "UNAUTHENTICATED") {
    return new AuthenticationError("User must be logged in");
  }
  return new Error("Someting went wrong!");
};
