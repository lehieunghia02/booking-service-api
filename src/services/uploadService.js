const { bucket } = require('../config/gcsConfig');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

class UploadService {
  // Upload một file lên GCS
  async uploadFile(file, folder = 'uploads') {
    try {
      if (!file) throw new Error('No file provided');

      // Tạo tên file duy nhất
      const originalName = path.parse(file.originalname).name.replace(/\s+/g, '-').toLowerCase();
      const extension = path.parse(file.originalname).ext;
      const fileName = `${folder}/${originalName}-${uuidv4()}${extension}`;
      
      // Tạo đối tượng file trên GCS
      const blob = bucket.file(fileName);
      
      // Tạo stream để ghi dữ liệu
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype,
        },
      });

      // Xử lý lỗi stream
      return new Promise((resolve, reject) => {
        blobStream.on('error', (error) => {
          reject(new Error(`Could not upload file: ${error}`));
        });

        blobStream.on('finish', () => {
          // Tạo URL công khai cho file
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
          
          resolve({
            fileName,
            publicUrl
          });
        });

        // Ghi dữ liệu và kết thúc stream
        blobStream.end(file.buffer);
      });
    } catch (error) {
      throw new Error(`Upload service error: ${error.message}`);
    }
  }

  // Upload nhiều file
  async uploadMultipleFiles(files, folder = 'uploads') {
    try {
      if (!files || files.length === 0) throw new Error('No files provided');
      
      const uploadPromises = files.map(file => this.uploadFile(file, folder));
      return Promise.all(uploadPromises);
    } catch (error) {
      throw new Error(`Multiple upload error: ${error.message}`);
    }
  }

  // Xóa file
  async deleteFile(fileName) {
    try {
      await bucket.file(fileName).delete();
      return { success: true, message: 'File deleted successfully' };
    } catch (error) {
      throw new Error(`Delete file error: ${error.message}`);
    }
  }
}

module.exports = new UploadService();