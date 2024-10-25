import { Server } from "socket.io";

let io;

const connectedUsers = new Map();

export const initializeSocket = (httpServer) => {
  io = require("socket.io")(httpServer, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });
};
