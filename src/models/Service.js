const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - duration
 *       properties:
 *         _id:
 *           type: string
 *           description: ID tự động được tạo bởi MongoDB
 *         name:
 *           type: string
 *           description: Tên dịch vụ
 *         description:
 *           type: string
 *           description: Mô tả chi tiết về dịch vụ
 *         price:
 *           type: number
 *           description: Giá dịch vụ
 *         duration:
 *           type: number
 *           description: Thời gian dịch vụ (phút)
 *         image:
 *           type: string
 *           description: URL hình ảnh của dịch vụ
 *         isActive:
 *           type: boolean
 *           description: Trạng thái hoạt động của dịch vụ
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Thời gian tạo dịch vụ
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Thời gian cập nhật dịch vụ gần nhất
 */

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name service is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description service is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price service is required'],
    min: [0, 'Price service cannot be negative']
  },
  duration: {
    type: Number,
    required: [true, 'Time service is required'],
    min: [1, 'Time service must be at least 1 minute']
  },
  image: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const ServiceModel = mongoose.model('Service', serviceSchema);

module.exports = ServiceModel;
