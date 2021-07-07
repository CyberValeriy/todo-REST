const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      default: "No title",
      trim: true,
    },
    description: {
      type: String,
      default: "No title",
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
