const chat = require("../../models/chat.model");
const message = require("../../models/message.model");
const { checkAuth } = require("../../utils/checkAuth");

module.exports = {
  Query: {
    chats: async (_, __, { authUser }) => {
      try {
        checkAuth(authUser);
        return await chat.getChats(authUser);
      } catch (e) {
        throw e;
      }
    },

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
    sendTypingStatus: (_, args, { authUser, pubsub }) => {
      try {
        checkAuth(authUser);
        pubsub.publish("TYPING_STATUS", {
          isTyping: {
            sender_id: authUser._id,
            receiver_id: args.receiver_id,
          },
        });
        return args;
      } catch (e) {
        throw e;
      }
    },

    readMessages: async (_, args, { authUser }) => {
      checkAuth(authUser);
      await message.readMessages({
        ...args,
        ...{ sender_id: { $ne: authUser._id } },
      });
      return true;
    },
  },

  Subscription: {
    newMessage: {
      subscribe: (_, __, { pubsub }) => {
        return pubsub.asyncIterator("NEW_MESSAGE");
      },
    },
    isTyping: {
      subscribe: (_, __, { pubsub }) => {
        return pubsub.asyncIterator("TYPING_STATUS");
      },
    },
  },
};
