const mongoose = require("mongoose");

const authorModel = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address"
    ]
  },
  password: { type: String, minlength: 8, required: true },
  imagePath: { type: String }
});

const Author = mongoose.model("authors", authorModel);
module.exports = Author;
