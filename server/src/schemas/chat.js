const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new mongoose.Schema(
  {
    user1_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    user2_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const collection = "chats";
var model;

schema.virtual("unread_messages_count", {
  ref: "messages",
  localField: "_id",
  foreignField: "chat_id",
  count: true,
});

try {
  model = mongoose.model(schema);
} catch (e) {
  model = mongoose.model(collection, schema);
}

module.exports = model;
