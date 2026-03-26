console.log("Server file running...");
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");

// 🔥 INIT
const app = express();
const server = http.createServer(app);

// 🔥 SOCKET SETUP
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// 🔥 MIDDLEWARE
app.use(cors());
app.use(express.json());

// 🔥 DATABASE CONNECTION
mongoose
  .connect("mongodb://127.0.0.1:27017/codecollab")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// 🔥 ROUTES
app.use("/api/auth",require("./auth"));

// 🔥 SOCKET LOGIC (REAL-TIME CODE)
io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id);

  // JOIN ROOM
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`📌 ${socket.id} joined room ${roomId}`);
  });

  // CODE CHANGE
  socket.on("code-change", ({ roomId, code }) => {
    socket.to(roomId).emit("code-update", code);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// 🔥 TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// 🔥 START SERVER
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});