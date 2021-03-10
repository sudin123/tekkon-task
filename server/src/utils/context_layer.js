"use strict";
const { PubSub } = require("apollo-server");
const pubsub = new PubSub();

module.exports = (context) => {
  context.pubsub = pubsub;
  return context;
};
