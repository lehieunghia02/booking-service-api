// `const mongoose = require('mongoose');
// const Business = require('../models/Business');
// const Category = require('../models/Category');
// const Service = require('../models/Service');
// const Location = require('../models/Location');

// /**
//  * Tạo dữ liệu mẫu cho các salon
//  */
// const createBusiness = async () => {
//   try {
//     // Lấy dữ liệu từ các collection khác để tham chiếu
//     const categories = await Category.find({});
//     const services = await Service.find({});
//     const locations = await Location.find({});

//     if (!categories.length || !services.length || !locations.length) {
//       throw new Error('Categories, services, or locations not found. Please seed them first.');
//     }
//     // Map để dễ dàng tìm kiếm theo tên
//     const categoryMap = {};
//     categories.forEach(cat => {
//       categoryMap[cat.name] = cat._id;
//     });

//     // Tạo map services theo category
//     const servicesByCategory = {};
//     services.forEach(service => {
//       const categoryId = service.category.toString();
//       if (!servicesByCategory[categoryId]) {
//         servicesByCategory[categoryId] = [];
//       }
//       servicesByCategory[categoryId].push(service._id);
//     });
//     // Dữ liệu mẫu cho các salon
//     const businessData = [
//       // Salon 1 - Luminova Nails & Spa
//       {
//         name: 'Luminova Nails & Spa',
//         description: 'Premium nail salon offering a wide range of nail care services in a luxurious environment',
//         location: locations.find(loc => loc.city === 'Ho Chi Minh City')?._id,
//         services: [
//           ...getRandomServices(servicesByCategory, categoryMap['Manicure'], 3),
//           ...getRandomServices(servicesByCategory, categoryMap['Eyelashes'], 2)
//         ],
//         images: 'https://example.com/images/luminova-salon.jpg',
//         rating_summary: {
//           average_rating: 4.7,
//           total_ratings: 128,
//           rating_distribution: {
//             1: 2,
//             2: 3,
//             3: 8,
//             4: 35,
//             5: 80
//           },
//           review_count: 98
//         },
//         search_count: 450,
//         view_count: 1200,
//         booking_count: 320,
//         categories: [categoryMap['Manicure'], categoryMap['Eyelashes']],
//         address: {
//           street: '123 Nguyen Hue Boulevard',
//           city: 'Ho Chi Minh City',
//           district: 'District 1',
//           country: 'Vietnam',
//           postal_code: '70000'
//         },
//         phone: '+84 28 1234 5678',
//         email: 'contact@luminovanails.com',
//         website: 'https://luminovanails.com',
//         business_hours: {
//           monday: { open: '09:00', close: '20:00' },
//           tuesday: { open: '09:00', close: '20:00' },
//           wednesday: { open: '09:00', close: '20:00' },
//           thursday: { open: '09:00', close: '20:00' },
//           friday: { open: '09:00', close: '21:00' },
//           saturday: { open: '09:00', close: '21:00' },
//           sunday: { open: '10:00', close: '18:00' }
//         },
//         is_active: true,
//         is_deleted: false,
//         logo: 'https://example.com/images/luminova-logo.png'
//       },
      
//       // Salon 2 - Elegance Hair Studio
//       {
//         name: 'Elegance Hair Studio',
//         description: 'Professional hair salon specializing in cutting-edge styles and treatments',
//         location: locations.find(loc => loc.city === 'Ho Chi Minh City')?._id,
//         services: [
//           ...getRandomServices(servicesByCategory, categoryMap['Hair'], 4),
//           ...getRandomServices(servicesByCategory, categoryMap['For men'], 2)
//         ],
//         images: 'https://example.com/images/elegance-salon.jpg',
//         rating_summary: {
//           average_rating: 4.5,
//           total_ratings: 210,
//           rating_distribution: {
//             1: 5,
//             2: 8,
//             3: 15,
//             4: 62,
//             5: 120
//           },
//           review_count: 175
//         },
//         search_count: 580,
//         view_count: 1500,
//         booking_count: 420,
//         categories: [categoryMap['Hair'], categoryMap['For men']],
//         address: {
//           street: '45 Le Loi Street',
//           city: 'Ho Chi Minh City',
//           district: 'District 1',
//           country: 'Vietnam',
//           postal_code: '70000'
//         },
//         phone: '+84 28 2345 6789',
//         email: 'info@elegancehair.com',
//         website: 'https://elegancehair.com',
//         business_hours: {
//           monday: { open: '10:00', close: '20:00' },
//           tuesday: { open: '10:00', close: '20:00' },
//           wednesday: { open: '10:00', close: '20:00' },
//           thursday: { open: '10:00', close: '20:00' },
//           friday: { open: '10:00', close: '21:00' },
//           saturday: { open: '09:00', close: '21:00' },
//           sunday: { open: '10:00', close: '18:00' }
//         },
//         is_active: true,
//         is_deleted: false,
//         logo: 'https://example.com/images/elegance-logo.png'
//       },
      
//       // Salon 3 - Serenity Spa & Wellness
//       {
//         name: 'Serenity Spa & Wellness',
//         description: 'Luxury spa offering a range of relaxation and wellness treatments',
//         location: locations.find(loc => loc.city === 'Ho Chi Minh City')?._id,
//         services: [
//           ...getRandomServices(servicesByCategory, categoryMap['Body'], 3),
//           ...getRandomServices(servicesByCategory, categoryMap['Face'], 3)
//         ],
//         images: 'https://example.com/images/serenity-spa.jpg',
//         rating_summary: {
//           average_rating: 4.8,
//           total_ratings: 156,
//           rating_distribution: {
//             1: 1,
//             2: 2,
//             3: 5,
//             4: 25,
//             5: 123
//           },
//           review_count: 130
//         },
//         search_count: 320,
//         view_count: 980,
//         booking_count: 280,
//         categories: [categoryMap['Body'], categoryMap['Face']],
//         address: {
//           street: '78 Dong Khoi Street',
//           city: 'Ho Chi Minh City',
//           district: 'District 1',
//           country: 'Vietnam',
//           postal_code: '70000'
//         },
//         phone: '+84 28 3456 7890',
//         email: 'booking@serenityspa.com',
//         website: 'https://serenityspa.com',
//         business_hours: {
//           monday: { open: '09:00', close: '21:00' },
//           tuesday: { open: '09:00', close: '21:00' },
//           wednesday: { open: '09:00', close: '21:00' },
//           thursday: { open: '09:00', close: '21:00' },
//           friday: { open: '09:00', close: '22:00' },
//           saturday: { open: '09:00', close: '22:00' },
//           sunday: { open: '10:00', close: '20:00' }
//         },
//         is_active: true,
//         is_deleted: false,
//         logo: 'https://example.com/images/serenity-logo.png'
//       },
      
//       // Salon 4 - BeautyZone
//       {
//         name: 'BeautyZone',
//         description: 'Complete beauty salon offering a wide range of services for face, body, and hair',
//         location: locations.find(loc => loc.city === 'Hanoi')?._id,
//         services: [
//           ...getRandomServices(servicesByCategory, categoryMap['Face'], 2),
//           ...getRandomServices(servicesByCategory, categoryMap['Makeup'], 2),
//           ...getRandomServices(servicesByCategory, categoryMap['Hair'], 2)
//         ],
//         images: 'https://example.com/images/beautyzone.jpg',
//         rating_summary: {
//           average_rating: 4.3,
//           total_ratings: 185,
//           rating_distribution: {
//             1: 5,
//             2: 10,
//             3: 20,
//             4: 65,
//             5: 85
//           },
//           review_count: 150
//         },
//         search_count: 410,
//         view_count: 1100,
//         booking_count: 290,
//         categories: [categoryMap['Face'], categoryMap['Makeup'], categoryMap['Hair']],
//         address: {
//           street: '25 Trang Tien Street',
//           city: 'Hanoi',
//           district: 'Hoan Kiem',
//           country: 'Vietnam',
//           postal_code: '10000'
//         },
//         phone: '+84 24 1234 5678',
//         email: 'info@beautyzone.com',
//         website: 'https://beautyzone.com',
//         business_hours: {
//           monday: { open: '09:00', close: '20:00' },
//           tuesday: { open: '09:00', close: '20:00' },
//           wednesday: { open: '09:00', close: '20:00' },
//           thursday: { open: '09:00', close: '20:00' },
//           friday: { open: '09:00', close: '21:00' },
//           saturday: { open: '09:00', close: '21:00' },
//           sunday: { open: '10:00', close: '18:00' }
//         },
//         is_active: true,
//         is_deleted: false,
//         logo: 'https://example.com/images/beautyzone-logo.png'
//       },
      
//       // Salon 5 - GentleMen's Barber
//       {
//         name: "GentleMen's Barber",
//         description: 'Premium barbershop specializing in men\'s grooming and styling',
//         location: locations.find(loc => loc.city === 'Hanoi')?._id,
//         services: [
//           ...getRandomServices(servicesByCategory, categoryMap['For men'], 4)
//         ],
//         images: 'https://example.com/images/gentlemen-barber.jpg',
//         rating_summary: {
//           average_rating: 4.6,
//           total_ratings: 120,
//           rating_distribution: {
//             1: 2,
//             2: 3,
//             3: 10,
//             4: 30,
//             5: 75
//           },
//           review_count: 95
//         },
//         search_count: 280,
//         view_count: 850,
//         booking_count: 230,
//         categories: [categoryMap['For men'], categoryMap["Men's haircut"]],
//         address: {
//           street: '56 Ba Trieu Street',
//           city: 'Hanoi',
//           district: 'Hai Ba Trung',
//           country: 'Vietnam',
//           postal_code: '10000'
//         },
//         phone: '+84 24 2345 6789',
//         email: 'appointments@gentlemensbarber.com',
//         website: 'https://gentlemensbarber.com',
//         business_hours: {
//           monday: { open: '10:00', close: '20:00' },
//           tuesday: { open: '10:00', close: '20:00' },
//           wednesday: { open: '10:00', close: '20:00' },
//           thursday: { open: '10:00', close: '20:00' },
//           friday: { open: '10:00', close: '21:00' },
//           saturday: { open: '09:00', close: '21:00' },
//           sunday: { open: '10:00', close: '17:00' }
//         },
//         is_active: true,
//         is_deleted: false,
//         logo: 'https://example.com/images/gentlemen-logo.png'
//       }
//     ];

//     // Xóa dữ liệu cũ
//     await Business.deleteMany({});
    
//     // Thêm các trường còn thiếu và tạo dữ liệu
//     const enhancedBusinessData = businessData.map(business => {
//       // Thêm view_count và booking_count nếu chưa có
//       if (!business.view_count) business.view_count = Math.floor(Math.random() * 1000) + 100;
//       if (!business.booking_count) business.booking_count = Math.floor(Math.random() * 300) + 50;
      
//       return business;
//     });
    
//     // Insert dữ liệu mới
//     const result = await Business.insertMany(enhancedBusinessData);
//     console.log(`${result.length} businesses created successfully`);
//     return result;
//   } catch (error) {
//     console.error('Error creating businesses:', error);
//     throw error;
//   }
// };

// /**
//  * Lấy ngẫu nhiên một số dịch vụ từ một danh mục
//  */
// function getRandomServices(servicesByCategory, categoryId, count) {
//   if (!categoryId) return [];
  
//   const categoryServices = servicesByCategory[categoryId.toString()] || [];
//   if (categoryServices.length <= count) return categoryServices;
  
//   // Lấy ngẫu nhiên count dịch vụ
//   const shuffled = [...categoryServices].sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, count);
// }

// module.exports = {
//   seedBusinesses: createBusinesses
// };
