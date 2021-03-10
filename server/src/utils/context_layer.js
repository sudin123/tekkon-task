"use strict";
const { PubSub } = require("apollo-server");
const pubsub = new PubSub();
const jwt = require("jsonwebtoken");

module.exports = (context) => {
  const token = context.req.headers.authorization || "";
  let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  context.authUser = decoded.user;
  context.pubsub = pubsub;
  return context;
};
