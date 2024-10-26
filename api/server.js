import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

//routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { connectDB } from "./config/db.js";
import { initializeSocket } from "./socket/socket.server.js";
import {createServer} from 'http'

dotenv.config();
const app = express();
app.use(express.json({ limit: "50mb" })); // To parse JSON data in the req.body // To parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // To parse form data in the req.body
app.use(cookieParser()); //To use cookies
3
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
const httpServer = createServer(app)
const PORT = process.env.PORT || 5000;

initializeSocket(httpServer)

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/message", messageRoutes);

httpServer.listen(PORT, (req, res) => {
  console.log(`server is running on ${PORT}`);
  connectDB();
});
