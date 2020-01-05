const express = require("express");
const categoryController = require("../controllers/categories_controller");
const paginationModel = require("../middlewares/pagination_middleware");
const Category = require("../models/category_model");
const categoriesRouter = express.Router();

// Get All Categories
categoriesRouter.get(
  "/",
  paginationModel(Category, null),
  categoryController.categories_get_all
);

// Get Category By Id
categoriesRouter.get(
  "/:categoryId",
  categoryController.categories_get_category
);

module.exports = categoriesRouter;
