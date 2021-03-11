"use strict";

const { AuthenticationError } = require("apollo-server-errors");

module.exports = (err) => {
  console.log(err)
  if (process.env.NODE_ENV == "development") {
    throw err;
  }

  /**
   * * hiding detail info for production use
   */
  if (err.extensions.code == "UNAUTHENTICATED") {
    throw new AuthenticationError("User must be logged in");
  }
  throw new Error("Someting went wrong!");
};
