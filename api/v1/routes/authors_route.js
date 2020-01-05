const express = require("express");
const authorController = require("../controllers/authors_controller");
const paginationModel = require("../middlewares/pagination_middleware");
const Author = require("../models/author_model");
const auhtorsRouter = express.Router();

// Get All Categories
auhtorsRouter.get(
  "/",
  paginationModel(Author, null),
  authorController.authors_get_all
);

// Get Category By Id
auhtorsRouter.get("/:authorId", authorController.authors_get_author);

module.exports = auhtorsRouter;
