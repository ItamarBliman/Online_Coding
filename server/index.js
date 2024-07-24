const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const setupSocket = require("./socket");
const codeblockRoutes = require("./routes/codeblocks");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/codeblocks", codeblockRoutes);

setupSocket(server);

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
