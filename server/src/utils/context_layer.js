"use strict";
const { PubSub } = require("apollo-server");
const pubsub = new PubSub();
const jwt = require("jsonwebtoken");

module.exports = (context) => {
  try {
    const token = context.req.headers.authorization || "";
    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    context.authUser = decoded.user;
  } catch (e) {}
  context.pubsub = pubsub;
  return context;
};
