const mongoose = require("mongoose");

const bookModel = new mongoose.Schema({
  name: { type: String, required: true },
  coverPath: { type: String },
  avgRate: { type: Number, default: 0 },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: true
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authors",
    required: true
  }
});

const Book = mongoose.model("books", bookModel);
module.exports = Book;
