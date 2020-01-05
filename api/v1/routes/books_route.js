const express = require("express");
const bookController = require("../controllers/books_controller");
const paginationModel = require("../middlewares/pagination_middleware");
const Book = require("../models/book_model");
const booksRouter = express.Router();

// Get All Books
booksRouter.get("/", paginationModel(Book, null), bookController.books_get_all);

// Get Book By Id
booksRouter.get("/:bookId", bookController.books_get_book);

module.exports = booksRouter;
