const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const textFilesSchema = new Schema(
  {
    fileName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
  },
  {
    keywords: {
      type: Array,
      required: true,
      minlength: 1,
    },
  },
  {
    timestamps: true,
  }
);

const TextFiles = mongoose.model("TextFiles", textFilesSchema);

module.exports = TextFiles;
