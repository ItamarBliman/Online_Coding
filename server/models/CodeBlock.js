const mongoose = require("mongoose");

// codeBlockSchema for the CodeBlock model
const codeBlockSchema = new mongoose.Schema({
  name: { type: String, required: true },
  initialTemplate: { type: String },
  code: { type: String, required: true },
  role: { type: String, default: "mentor" },
  solution: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CodeBlock", codeBlockSchema);
