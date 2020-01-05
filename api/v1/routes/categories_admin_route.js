const express = require("express");
const categoryController = require("../controllers/categories_controller");
const paginationModel = require("../middlewares/pagination_middleware");
const Category = require("../models/category_model");
const categoriesAdminRouter = express.Router();

// Get All Categories
categoriesAdminRouter.get(
  "/",
  paginationModel(Category, null),
  categoryController.categories_get_all
);

// Get Category By Id
categoriesAdminRouter.get(
  "/:categoryId",
  categoryController.categories_get_category
);

// Create new Category
categoriesAdminRouter.post("/", categoryController.categories_create_category);

// Update Category
categoriesAdminRouter.patch(
  "/:categoryId",
  categoryController.categories_update_category
);

// Delete Category
categoriesAdminRouter.delete(
  "/:categoryId",
  categoryController.categories_delete_category
);

module.exports = categoriesAdminRouter;
