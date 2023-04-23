const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const searchSchema = new Schema(
  {
    search: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Search", searchSchema);

module.exports = User;
