const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
  const path = require('path');

  
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
}
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Giới hạn 5MB
  },
});

const uploadSingle = upload.single('image');

const uploadMultiple = upload.array('images', 5); // Tối đa 5 ảnh
module.exports = {
  uploadSingle,
  uploadMultiple
};