const express = require("express");
const booksController = require("../controllers/books_controller");
const uploadImage = require("../middlewares/uploadImage_middleware");
const paginationModel = require("../middlewares/pagination_middleware");
const Book = require("../models/book_model");
const bookAdminRouter = express.Router();

// Get All Books
bookAdminRouter.get(
  "/",
  paginationModel(Book, null),
  booksController.books_get_all
);

// Get Book By Id
bookAdminRouter.get("/:bookId", booksController.books_get_book);

// Create new Book
bookAdminRouter.post(
  "/",
  uploadImage.single("file"),
  booksController.books_create_book
);

// Update Book
bookAdminRouter.patch(
  "/:bookId",
  uploadImage.single("file"),
  booksController.books_update_book
);

// Delete Book
bookAdminRouter.delete("/:bookId", booksController.books_delete_book);

module.exports = bookAdminRouter;
