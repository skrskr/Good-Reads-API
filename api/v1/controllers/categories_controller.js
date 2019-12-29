const Category = require("../models/category_model");

// Get all categories route
module.exports.categories_get_all = async (req, res, next) => {
  try {
    const categories = await Category.find().select("-__v");
    if (categories) {
      const response = {
        count: categories.length,
        categories
      };
      return res.status(200).json(response);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message
    });
  }
};

// Get category by id route
module.exports.categories_get_category = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findOne({ _id: categoryId }).select("-__v");

    if (category) {
      const response = {
        category
      };
      return res.status(200).json(response);
    } else {
      return res.status(400).json({ error: "Category Not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message
    });
  }
};

// Create new Category Route
module.exports.categories_create_category = async (req, res, next) => {
  if (!req.body.name) {
    console.log("Missing Paramters");
    return res.status(400).json({
      error: "Missing Parameters"
    });
  }

  try {
    const category = new Category({
      name: req.body.name
    });

    const result = await category.save();
    if (result) {
      return res.status(201).json(result);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message
    });
  }
};

// Update Category By id Route
module.exports.categories_update_category = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  if (!req.body) {
    console.log("Missing Paramters");
    return res.status(400).json({
      error: "Missing Parameters"
    });
  }

  try {
    const newCategory = req.body;
    const result = await Category.updateOne({ _id: categoryId }, newCategory);
    if (result.n) {
      return res.status(200).json({ msg: "Category Updated Successfully" });
    } else {
      return res.status(404).json({ error: "Invalid Category Id" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message
    });
  }
};

// Delete Category By id Route
module.exports.categories_delete_category = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  try {
    const result = await Category.deleteOne({ _id: categoryId });
    if (result.n) {
      return res.status(200).json({ msg: "Category Deleted Successfully" });
    } else {
      return res.status(404).json({ error: "Invalid Category Id" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message
    });
  }
};
