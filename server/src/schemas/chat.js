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
try {
  model = mongoose.model(schema);
} catch (e) {
  model = mongoose.model(collection, schema);
}

module.exports = model;
