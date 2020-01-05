const bcrypt = require("bcrypt-nodejs");
const fs = require("fs");
const path = require("path");
const Book = require("../models/book_model");

// Get all books route
module.exports.books_get_all = async (req, res, next) => {
  /*
  try {
    const books = await Book.find().select("-__v");
    if (books) {
      const response = {
        count: books.length,
        books
      };
      return res.status(200).json(response);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message
    });
  }
  */
  res.status(200).json(res.results);
};

// Get book by id route
module.exports.books_get_book = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findOne({ _id: bookId }).select("-__v");

    if (book) {
      const response = {
        book
      };
      return res.status(200).json(response);
    } else {
      return res.status(400).json({ error: "Book Not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message
    });
  }
};

// Create new author Route
module.exports.books_create_book = async (req, res, next) => {
  if (!req.body.name || !req.body.categoryId || !req.body.authorId) {
    console.log("Missing Paramters");
    return res.status(400).json({
      error: "Missing Parameters"
    });
  }

  try {
    const coverPath = req.file && req.file.filename ? req.file.filename : "";

    const book = new Book({
      name: req.body.name,
      categoryId: req.body.categoryId,
      authorId: req.body.authorId,
      coverPath
    });

    const result = await book.save();
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

// Update book By id Route
module.exports.books_update_book = async (req, res, next) => {
  const bookId = req.params.bookId;
  if (!req.body) {
    console.log("Missing Paramters");
    return res.status(400).json({
      error: "Missing Parameters"
    });
  }

  try {
    const newBook = req.body;
    if (req.file && req.file.filename) {
      newBook.coverPath = req.file.filename;
      const oldData = await Book.findById({ _id: bookId });
      if (oldData && oldData.coverPath) {
        const pathDel = path.join(
          __dirname,
          "../../../public/images",
          oldData.coverPath
        );
        fs.unlinkSync(pathDel);
      }
    }
    const result = await Book.updateOne({ _id: bookId }, newBook);
    if (result.n) {
      return res.status(200).json({ msg: "Book Updated Successfully" });
    } else {
      return res.status(404).json({ error: "Invalid Book Id" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message
    });
  }
};

// Delete author By id Route
module.exports.books_delete_book = async (req, res, next) => {
  const bookId = req.params.bookId;
  try {
    const book = await Book.findById({ _id: bookId });
    if (book && book.coverPath) {
      const pathDel = path.join(
        __dirname,
        "../../../public/images",
        book.coverPath
      );
      fs.unlinkSync(pathDel);
    }
    const result = await Book.deleteOne({ _id: bookId });
    if (result.n) {
      return res.status(200).json({ msg: "Book Deleted Successfully" });
    } else {
      return res.status(404).json({ error: "Invalid Book Id" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message
    });
  }
};
