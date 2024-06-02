const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let fileDestination = "public/uploads/";
    // check if directory exist or not
    if (!fs.existsSync(fileDestination)) {
      fs.mkdirSync(fileDestination, { recursive: true });
      cb(null, fileDestination);
    } else {
      cb(null, fileDestination);
    }
  },
  filename: function (req, file, cb) {
    let filename = path.basename(
      file.originalname,
      path.extname(file.originalname)
    );
    let ext = path.extname(file.originalname);
    cb(null, filename + "-" + Date.now() + ext);
  },
});

const imageFilter = (req, file, cb) => {
  // The image filter will reject any file that's not an image.
  if (
    !file.originalname.match(/\.(jpg|png|svg|jpeg|gif|webp|JPEG|JPG|PNG|SVG|GIF|WEBP)$/)
  ) {
    return cb(new Error("you can upload image file only"), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 2000000, //2mb
  },
});

module.exports = upload;
