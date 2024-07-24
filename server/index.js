const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const path = require("path");
const setupSocket = require("./socket");
const codeblockRoutes = require("./routes/codeblocks");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// CORS configuration
app.use(
  cors({
    origin: "https://extraordinary-empathy-production.up.railway.app:8080",
  })
);
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API routes
app.use("/api/codeblocks", codeblockRoutes);

// WebSocket setup
setupSocket(server);

// Serve static files if needed (not typically required if deploying client separately)
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
