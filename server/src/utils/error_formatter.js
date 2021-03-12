"use strict";

module.exports = (err) => {
  if (process.env.NODE_ENV == "development") {
    throw err;
  }

  /**
   * * hiding detail info for production use
   */
  if (err.extensions.code == "UNAUTHENTICATED") {
    return err;
  }
  if (err.extensions.code == "GRAPHQL_VALIDATION_FAILED") {
    return err;
  }
  throw new Error("Someting went wrong!");
};
