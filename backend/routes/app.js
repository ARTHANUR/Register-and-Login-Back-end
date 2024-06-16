const express = require("express");
const app = express();
const cors = require("cors")
const userRouter = require("./userRoutes");
app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
const blogRoute = require("./blogRoute");
app.use("/api/blog",blogRoute)

module.exports = app;
