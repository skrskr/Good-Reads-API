const express = require("express");
const authorController = require("../controllers/authors_controller");
const auhtorsRouter = express.Router();

// Get All Categories
auhtorsRouter.get("/", authorController.authors_get_all);

// Get Category By Id
auhtorsRouter.get("/:authorId", authorController.authors_get_author);

module.exports = auhtorsRouter;
