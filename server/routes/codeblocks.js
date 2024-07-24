const express = require("express");
const CodeBlock = require("../models/CodeBlock");

const router = express.Router();

// GET /codeblocks
router.get("/", async (req, res) => {
  try {
    console.log("Fetching code blocks");
    const codeBlocks = await CodeBlock.find();
    res.json(codeBlocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /codeblocks/:id
router.get("/:id", async (req, res) => {
  try {
    console.log("Fetching code block:", req.params.id);
    const codeBlock = await CodeBlock.findById(req.params.id);
    if (codeBlock == null) {
      return res.status(404).json({ message: "Code block not found" });
    }
    res.json(codeBlock);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
