import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import connectDB from "../config/database";
import auth from "./routes/api/auth";
import user from "./routes/api/user";
import profile from "./routes/api/profile";
import feneko from "./routes/api/feneko";
import taka from "./routes/api/taka";

const app = express();

// Set up .env config
require("dotenv").config();

// Connect to MongoDB
connectDB();

// Express configuration
app.use(cors());
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get("/", (_req, res) => {
  res.send("API Running");
});

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/profile", profile);
app.use("/api/feneko", feneko);
app.use("/api/taka", taka);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
