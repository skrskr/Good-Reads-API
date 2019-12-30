const express = require("express");
const bookController = require("../controllers/books_controller");
const booksRouter = express.Router();

// Get All Books
booksRouter.get("/", bookController.books_get_all);

// Get Book By Id
booksRouter.get("/:bookId", bookController.books_get_book);

module.exports = booksRouter;
