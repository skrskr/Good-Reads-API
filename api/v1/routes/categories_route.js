const express = require("express");
const categoryController = require("../controllers/categories_controller");
const categoriesRouter = express.Router();

// Get All Categories
categoriesRouter.get("/", categoryController.categories_get_all);

// Get Category By Id
categoriesRouter.get(
  "/:categoryId",
  categoryController.categories_get_category
);

module.exports = categoriesRouter;
