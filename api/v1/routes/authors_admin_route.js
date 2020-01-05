const express = require("express");
const auhtorController = require("../controllers/authors_controller");
const uploadImage = require("../middlewares/uploadImage_middleware");
const paginationModel = require("../middlewares/pagination_middleware");
const Author = require("../models/author_model");
const auhtorAdminRouter = express.Router();

// Get All Categories
auhtorAdminRouter.get(
  "/",
  paginationModel(Author, null),
  auhtorController.authors_get_all
);

// Get Category By Id
auhtorAdminRouter.get("/:authorId", auhtorController.authors_get_author);

// Create new Category
auhtorAdminRouter.post(
  "/",
  uploadImage.single("file"),
  auhtorController.authors_create_author
);

// Update Category
auhtorAdminRouter.patch(
  "/:authorId",
  uploadImage.single("file"),
  auhtorController.authors_update_author
);

// Delete Category
auhtorAdminRouter.delete("/:authorId", auhtorController.authors_delete_author);

module.exports = auhtorAdminRouter;
