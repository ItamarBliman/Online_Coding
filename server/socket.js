const socketIo = require("socket.io");
const CodeBlock = require("./models/CodeBlock");

// Store room and hints data
const rooms = {};
const hintRequests = {};
const hints = {};

// Set up socket.io
const setupSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // Handle socket different events
  io.on("connection", (socket) => {
    console.log("New client connected");

    // A student or mentor joins a room
    socket.on("joinRoom", async ({ codeBlockId }) => {
      socket.join(codeBlockId);
      const roomSize = io.sockets.adapter.rooms.get(codeBlockId)?.size || 0;

      // If the room is empty, the client is the mentor
      if (roomSize === 1) {
        rooms[codeBlockId] = { mentor: socket.id };
        socket.emit("roleUpdate", "mentor");
        socket.emit("numStudentsUpdate", 0);
      }
      // If the room is not empty, the client is a student
      else {
        socket.emit("roleUpdate", "student");
        io.to(codeBlockId).emit("numStudentsUpdate", roomSize - 1);
      }

      console.log(`Client joined room ${codeBlockId}. Room size: ${roomSize}`);
    });

    // Students changes the code and it is broadcasted to the room
    socket.on("codeChange", async ({ codeBlockId, newCode }) => {
      socket.to(codeBlockId).emit("codeUpdate", newCode);
      await CodeBlock.findByIdAndUpdate(codeBlockId, {
        code: newCode,
        updatedAt: new Date(),
      });

      // Check if the code matches the solution to notify the student
      const codeBlock = await CodeBlock.findById(codeBlockId);
      if (codeBlock.solution && codeBlock.solution === newCode) {
        socket.emit("codeMatched", true);
      } else {
        socket.emit("codeMatched", false);
      }
    });

    // There is a hint request from a student
    socket.on("hintRequest", ({ codeBlockId }) => {
      if (hints[codeBlockId]) {
        socket.emit("hintReceived", hints[codeBlockId]);
      } else {
        if (!hintRequests[codeBlockId]) hintRequests[codeBlockId] = new Set();
        hintRequests[codeBlockId].add(socket.id);

        const mentorId = rooms[codeBlockId]?.mentor;
        if (mentorId) {
          io.to(mentorId).emit("hintRequested", { studentId: socket.id });
        }
      }
    });

    // The mentor provides a hint
    socket.on("provideHint", ({ codeBlockId, hint }) => {
      hints[codeBlockId] = hint;
      const students = hintRequests[codeBlockId] || [];
      students.forEach((studentId) => {
        io.to(studentId).emit("hintReceived", hint);
      });

      hintRequests[codeBlockId] = new Set();
    });

    // A client leaves the room
    socket.on("leaveRoom", async ({ codeBlockId }) => {
      socket.leave(codeBlockId);
      const roomSize = io.sockets.adapter.rooms.get(codeBlockId)?.size || 0;

      // If the mentor leaves, close the room
      if (rooms[codeBlockId] && rooms[codeBlockId].mentor === socket.id) {
        console.log("Mentor left, closing room:", codeBlockId);

        const codeBlock = await CodeBlock.findById(codeBlockId);

        // Reset the code to the initial template when the mentor leaves
        if (codeBlock) {
          await CodeBlock.findByIdAndUpdate(codeBlockId, {
            code: codeBlock.initialTemplate,
            updatedAt: new Date(),
          });

          console.log(`Reset code for ${codeBlockId} to initial template.`);
        }

        // Notify the students that the mentor left
        io.to(codeBlockId).emit("mentorLeft");
        delete rooms[codeBlockId];
        delete hintRequests[codeBlockId];
        delete hints[codeBlockId];
      } else {
        io.to(codeBlockId).emit("numStudentsUpdate", roomSize - 1);
      }

      console.log(`Client left room ${codeBlockId}. Room size: ${roomSize}`);
    });

    // A client disconnects
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

module.exports = setupSocket;
