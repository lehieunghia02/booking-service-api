// const mongoose = require('mongoose');
// const Location = require('../models/Location'); // Đường dẫn tới model Location của bạn

// const dataLocation = [
//   {
//     city: "Ho Chi Minh",
//     region: "South",
//     country: "Vietnam",
//     country_code: "VN",
//     timezone: "Asia/Ho_Chi_Minh",
//     currency: "VND",
//   },
//   {
//     city: "Hanoi",
//     region: "North",
//     country: "Vietnam",
//     country_code: "VN",
//     timezone: "Asia/Ho_Chi_Minh",
//     currency: "VND",
//   },
//   {
//     city: "Da Nang",
//     region: "Central",
//     country: "Vietnam",
//     country_code: "VN",
//     timezone: "Asia/Ho_Chi_Minh",
//     currency: "VND",
//   },
//   {
//     city: "New York",
//     region: "New York",
//     country: "United States",
//     country_code: "US",
//     timezone: "America/New_York",
//     currency: "USD",
//   },
//   {
//     city: "London",
//     region: "England",
//     country: "United Kingdom",
//     country_code: "GB",
//     timezone: "Europe/London",
//     currency: "GBP",
//   }
// ];

// async function seedLocations() {
//   try {
//     // Kết nối tới MongoDB
//       await mongoose.connect(process.env.MONGODB_URL_DEPLOYMENT, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('Connected to MongoDB');

//     // Xóa hết dữ liệu cũ (nếu muốn)
//     await Location.deleteMany({});

//     // Thêm dữ liệu mới
//     const result = await Location.insertMany(dataLocation);
//     console.log(`Inserted ${result.length} locations`);

//   } catch (error) {
//     console.error('Error seeding locations:', error);
//   } finally {
//     // Ngắt kết nối
//     await mongoose.disconnect();
//   }
// }

// seedLocations();
