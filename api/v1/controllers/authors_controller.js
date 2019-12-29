const Author = require("../models/author_model");

// Get all auhtors route
module.exports.authors_get_all = async (req, res, next) => {
  try {
    const authors = await Author.find().select("-__v");
    if (authors) {
      const response = {
        count: authors.length,
        authors
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

// Get author by id route
module.exports.authors_get_author = async (req, res, next) => {
  try {
    const authorId = req.params.authorId;
    const author = await Author.findOne({ _id: authorId }).select("-__v");

    if (author) {
      const response = {
        author
      };
      return res.status(200).json(response);
    } else {
      return res.status(400).json({ error: "Author Not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message
    });
  }
};

// Create new author Route
module.exports.authors_create_author = async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    console.log("Missing Paramters");
    return res.status(400).json({
      error: "Missing Parameters"
    });
  }

  try {
    const author = new Author({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      imagePath: req.body.imagePath ? req.body.imagePath : ""
    });

    const result = await author.save();
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

// Update author By id Route
module.exports.authors_update_author = async (req, res, next) => {
  const authorId = req.params.authorId;
  if (!req.body) {
    console.log("Missing Paramters");
    return res.status(400).json({
      error: "Missing Parameters"
    });
  }

  try {
    const newAuthor = req.body;
    const result = await Author.updateOne({ _id: authorId }, newAuthor);
    if (result.n) {
      return res.status(200).json({ msg: "Author Updated Successfully" });
    } else {
      return res.status(404).json({ error: "Invalid Author Id" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message
    });
  }
};

// Delete author By id Route
module.exports.authors_delete_author = async (req, res, next) => {
  const authorId = req.params.authorId;
  try {
    const result = await Author.deleteOne({ _id: authorId });
    if (result.n) {
      return res.status(200).json({ msg: "Author Deleted Successfully" });
    } else {
      return res.status(404).json({ error: "Invalid Author Id" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message
    });
  }
};
