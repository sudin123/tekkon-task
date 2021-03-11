const chat = require("../../models/chat.model");
const message = require("../../models/message.model");
const { checkAuth } = require("../../utils/checkAuth");

module.exports = {
  Query: {
    chat: async (_, args, { authUser }) => {
      try {
        checkAuth(authUser);
        return await chat.findOne({
          userId: args.user_id,
          authId: authUser._id,
        });
      } catch (e) {
        throw e;
      }
    },
    messages: async (_, args, { authUser }) => {
      try {
        checkAuth(authUser);
        return await message.get(args);
      } catch (e) {
        throw e;
      }
    },
  },

  Mutation: {
    sendMessage: async (_, args, { authUser, pubsub }) => {
      try {
        checkAuth(authUser);
        let res = await message.create({
          ...args,
          ...{ sender_id: authUser._id },
        });
        await pubsub.publish("NEW_MESSAGE", {
          newMessage: {
            sender_id: authUser._id,
            to: args.user_id,
            message: args.message,
          },
        });
        return res;
      } catch (e) {
        throw e;
      }
    },
  },

  Subscription: {
    newMessage: {
      subscribe: (_, __, { pubsub }) => {
        return pubsub.asyncIterator("NEW_MESSAGE");
      },
    },
  },
};
