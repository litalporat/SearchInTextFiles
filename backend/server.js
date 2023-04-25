require("dotenv").config();
const express = require("express");

const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const searchRouter = require("./routes/search");

const app = express();

const uri = process.env.ATLAS_URI;
mongoose.connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
mongoose.connect(uri);

app.use(cors());
app.use(express.json());

app.use("/search", searchRouter);

const server = http.createServer(app);
const ioServer = new Server(server, {
  cors: { origin: "http://localhost:3000" },
});
app.set("io", ioServer);
const port = process.env.PORT || 5001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
