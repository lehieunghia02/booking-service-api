const uploadService = require('../services/uploadService');

class UploadController {
  // Upload một ảnh
  async uploadImage(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Please upload a file!'
        });
      }

      // Xác định thư mục dựa vào query param
      const folder = req.query.folder || 'uploads';
      
      // Upload file lên GCS
      const uploadResult = await uploadService.uploadFile(req.file, folder);
      
      res.status(200).json({
        success: true,
        message: 'Uploaded the file successfully',
        data: uploadResult
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({
        success: false,
        message: `Could not upload the file: ${error.message}`
      });
    }
  }

  // Upload nhiều ảnh
  async uploadMultipleImages(req, res) {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Please upload at least one file!'
        });
      }

      // Xác định thư mục dựa vào query param
      const folder = req.query.folder || 'uploads';
      
      // Upload các file lên GCS
      const uploadResults = await uploadService.uploadMultipleFiles(req.files, folder);
      
      res.status(200).json({
        success: true,
        message: `Uploaded ${req.files.length} files successfully`,
        data: uploadResults
      });
    } catch (error) {
      console.error('Multiple upload error:', error);
      res.status(500).json({
        success: false,
        message: `Could not upload the files: ${error.message}`
      });
    }
  }

  // Xóa ảnh
  async deleteImage(req, res) {
    try {
      const { fileName } = req.params;
      
      if (!fileName) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a file name!'
        });
      }
      
      // Xóa file từ GCS
      await uploadService.deleteFile(fileName);
      
      res.status(200).json({
        success: true,
        message: 'File deleted successfully'
      });
    } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({
        success: false,
        message: `Could not delete the file: ${error.message}`
      });
    }
  }
}

module.exports = new UploadController();