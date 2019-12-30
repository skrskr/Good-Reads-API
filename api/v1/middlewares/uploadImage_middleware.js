const multer = require("multer");
const path = require("path");

// filter files
const filterFiles = (req, file, cb) => {
  // Accept only files with this types
  if (
    file.mimetype === "image/gif" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    // this type not suported and not storaged
    cb(new Error(file.mimetype + " is not supported"), false);
  }
};

// configure uploading images
const storage = new multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../../public/images"));
  },
  filename: (req, file, cb) => {
    // console.log(file);
    let filetype = "";
    if (file.mimetype === "image/gif") {
      filetype = "gif";
    }
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    cb(null, "image_" + Date.now() + "." + filetype);
  }
});

const uploadImage = multer({
  storage: storage,
  limits: {
    // Limit size to 5 MB
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: filterFiles
});

module.exports = uploadImage;
