const ServiceModel = require('../models/Service');
const data = [
  {
    _id: "srv001",
    name: "Classic Manicure",
    description: "Dịch vụ làm móng cơ bản bao gồm cắt, dũa, tạo hình và sơn móng",
    price: 350,
    duration: 45,
    image: "classic_manicure.jpg",
    category: "cat001",
    isActive: true
  },
  {
  _id: "cat002",
    name: "Hair",
    description: "Các dịch vụ cắt, nhuộm và tạo kiểu tóc",
    image: "hair.jpg",
    is_popular: true,
    display_order: 2,
    services: []
  },
  {
    _id: "cat003",
    name: "Face",
  }

]
