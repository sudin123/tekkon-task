const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const collection = "users";

var model;
try {
  model = mongoose.model(Schema);
} catch (e) {
  model = mongoose.model(collection, Schema);
}

module.exports = model;
