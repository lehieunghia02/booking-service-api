const Category = require('../models/Category');

const categoryData = [
  {
    name: "Manicure",
    description: "Các dịch vụ chăm sóc và làm đẹp móng tay",
    image: "https://storage.googleapis.com/booking-service-images/Category/hair.jpg",
    is_popular: true,
    display_order: 1,
    is_active: true,
    is_deleted: false,
    services: []
  }, 
  {
    name: "Hair",
    description: "Các dịch vụ cắt, nhuộm và tạo kiểu tóc",
    image: "https://storage.googleapis.com/booking-service-images/Category/hair.jpg",
    is_popular: true,
    display_order: 2,
    is_active: true,
    is_deleted: false,
    services: []
  }, {
    name: "Face",
    description: "Các dịch vụ chăm sóc và điều trị da mặt",
    image: "https://storage.googleapis.com/booking-service-images/Category/face.jpg",
    is_popular: true,
    display_order: 3,
    is_active: true,
    is_deleted: false,
    services: []
  },
    {
    name: "Eyebrows", 
    description: "Services for eyebrow care and shaping",
    image: "https://storage.googleapis.com/booking-service-images/Category/eyebrows.jpg",
    is_popular: true,
    display_order: 4,
    is_active: true,
    is_deleted: false,
    services: []
  }, 
  {

    name: "Body",
    description: "Services for body care and shaping",
    image: "https://storage.googleapis.com/booking-service-images/Category/body.jpg",
    is_popular: true,
    display_order: 5,
    is_active: true,
    is_deleted: false,
    services: []
  },
  {
    name: "Massage",
    description: "Services for massage and body care",
    image: "https://storage.googleapis.com/booking-service-images/Category/massage.jpg",
    is_popular: true,
    display_order: 7,
    is_active: true,
    is_deleted: false,
    services: []
  },
  {
    name: "Makeup",
    description: "Services for makeup and beauty",
    image: "https://storage.googleapis.com/booking-service-images/Category/makeup.jpg",
    is_popular: true,
    display_order: 8,
    is_active: true,
    is_deleted: false,
    services: []
  },
  {
    name: "Nails",
    description: "Services for nails and beauty",
    image: "https://storage.googleapis.com/booking-service-images/Category/nails.jpg",
    is_popular: true,
    display_order: 9,
    is_active: true,
    is_deleted: false,
    services: []
  },
  {

    name: "Laser treatments",
    description: "Services for laser treatments and beauty",
    image: "https://storage.googleapis.com/booking-service-images/Category/laser.jpg",
    is_popular: false,
    display_order: 10,
    is_active: true,
    is_deleted: false,
    services: []
  }
]

const seedCategories = async () => {
  try {
    await Category.deleteMany();
    await Category.insertMany(categoryData);
    console.log("Categories seeded successfully");
  } catch (error) {
    console.error("Error seeding categories:", error);
    process.exit(1);
  }
};


module.exports = { seedCategories };
