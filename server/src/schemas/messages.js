const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new mongoose.Schema(
  {
    chat_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    message: {
      type: String,
      required: false,
      default: null,
    },
    is_read: {
      type: Boolean,
      default: false,
    },
    sender_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

schema.virtual("sender", {
  ref: "users",
  localField: "sender_id",
  foreignField: "_id",
  justOne: true,
});

const collection = "messages";

var model;
try {
  model = mongoose.model(schema);
} catch (e) {
  model = mongoose.model(collection, schema);
}

module.exports = model;
