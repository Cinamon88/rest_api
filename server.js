const express = require("express");
const cors = require("cors");
const path = require("path");
const socket = require("socket.io");
const mongoose = require("mongoose");
const helmet = require("helmet");

const testimonials = require('./routes/testimonials.routes');
const concerts = require('./routes/concerts.routes');
const seats = require('./routes/seats.routes');


const NODE_ENV = process.env.NODE_ENV;
console.log('Node', NODE_ENV);
if (NODE_ENV === "production")
  dbatlas = `mongodb+srv://lukasz:doUB9T3GLfYQ9L0H@cluster.toha3jg.mongodb.net/NewWaveDB?retryWrites=true&w=majority`;
else if (NODE_ENV === "test") dbatlas = "mongodb://localhost:27017/NewWaveDBtest";
else dbatlas = "mongodb://localhost:27017/NewWaveDB";

const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "/client/build")));

app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use("/api/", testimonials);
app.use("/api/", concerts);
app.use("/api/", seats);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});
app.use((req, res) => {
  res.status(404).send("404 not found...");
});
const server = app.listen(process.env.PORT || 8000, () => {
  if (NODE_ENV !== "test") {
    console.log("Server is running on port: 8000");
  }
});
const io = socket(server);
io.on("connection", (socket) => {
  console.log("Client connected with ID: " + socket.id);
});

// connects our backend code with the database
mongoose.connect(dbatlas, {
  useNewUrlParser: true,
});
const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to the database");
});

db.on("error", (err) => console.log("Error " + err));

module.exports = server;