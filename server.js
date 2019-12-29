const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const categoryRouter = require("./api/v1/routes/categories_route");
const categoryAdminRouter = require("./api/v1/routes/categories_admin_route");

const PORT = process.env.PORT || 3000;
const MONGO_URL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/goodreadersdb";

// Config cors
app.use(cors());

// Setup mongo database
mongoose.connect(
  MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) {
      console.log("Can't connect to mongo ERR:", err);
    } else {
      console.log("Connected to mongodb successfully");
    }
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setup Routes
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/admin/categories", categoryAdminRouter);

// Handle Errors Middlewares
// 404 Not found
app.use((req, res, next) => {
  const err = new Error("Resource Not Found");
  err.status = 404;
  next(err);
});

// handle errors Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: err.message
  });
});

// setup Server listen port
app.listen(PORT, err => {
  if (!err) console.log(`Server running in ${PORT} port`);
});
