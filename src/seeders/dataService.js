// const ServiceModel = require("../models/Service");
// const Category = require("../models/Category");

// // Tạo services theo categories
// const createLuminovaServices = async (categories) => {
//   try {
//     const serviceData = [];

//     // Nếu categories không được truyền vào, lấy từ database
//     if (!categories || !Array.isArray(categories)) {
//       console.log("Categories not provided, fetching from database...");
//       categories = await Category.find({});
      
//       if (!categories || categories.length === 0) {
//         throw new Error("No categories found in database");
//       }
//     }

//     // Map để giúp tìm category theo tên
//     const categoryMap = {};
//     categories.forEach(cat => {
//       categoryMap[cat.name] = cat._id;
//     });
    
//     // Dịch vụ Manicure
//     serviceData.push(
//       {
//         name: 'Gel Manicure',
//         description: 'Long-lasting gel polish application with manicure',
//         price: 350,
//         duration: 45,
//         image: 'https://example.com/images/gel-manicure.jpg',
//         category: categoryMap['Manicure'],
//         isActive: true
//       },
//       {
//         name: 'Classic Manicure',
//         description: 'Traditional manicure with regular polish',
//         price: 250,
//         duration: 30,
//         image: 'https://example.com/images/classic-manicure.jpg',
//         category: categoryMap['Manicure'],
//         isActive: true
//       },
//       {
//         name: 'Nail Art',
//         description: 'Custom nail designs and art',
//         price: 150,
//         duration: 20,
//         image: 'https://example.com/images/nail-art.jpg',
//         category: categoryMap['Manicure'],
//         isActive: true
//       }
//     );

//     // Dịch vụ Hair
//     serviceData.push(
//       {
//         name: 'Women\'s Haircut & Style',
//         description: 'Professional haircut and styling',
//         price: 400,
//         duration: 60,
//         image: 'https://example.com/images/womens-haircut.jpg',
//         category: categoryMap['Hair'],
//         isActive: true
//       },
//       {
//         name: 'Hair Coloring',
//         description: 'Full hair coloring service',
//         price: 800,
//         duration: 120,
//         image: 'https://example.com/images/hair-coloring.jpg',
//         category: categoryMap['Hair'],
//         isActive: true
//       },
//       {
//         name: 'Blowout & Styling',
//         description: 'Professional blowdry and styling',
//         price: 300,
//         duration: 45,
//         image: 'https://example.com/images/blowout.jpg',
//         category: categoryMap['Hair'],
//         isActive: true
//       }
//     );

//     // Dịch vụ Face
//     serviceData.push(
//       {
//         name: 'Classic Facial',
//         description: 'Deep cleansing facial with extraction',
//         price: 550,
//         duration: 60,
//         image: 'https://example.com/images/classic-facial.jpg',
//         category: categoryMap['Face'],
//         isActive: true
//       },
//       {
//         name: 'Anti-Aging Facial',
//         description: 'Specialized facial to reduce signs of aging',
//         price: 750,
//         duration: 75,
//         image: 'https://example.com/images/anti-aging-facial.jpg',
//         category: categoryMap['Face'],
//         isActive: true
//       },
//       {
//         name: 'Express Facial',
//         description: 'Quick refreshing facial treatment',
//         price: 350,
//         duration: 30,
//         image: 'https://example.com/images/express-facial.jpg',
//         category: categoryMap['Face'],
//         isActive: true
//       }
//     );

//     // For Men
//     serviceData.push(
//       {
//         name: 'Men\'s Haircut',
//         description: 'Professional men\'s haircut and styling',
//         price: 300,
//         duration: 45,
//         image: 'https://example.com/images/mens-haircut.jpg',
//         category: categoryMap['For men'],
//         isActive: true
//       },
//       {
//         name: 'Beard Trim',
//         description: 'Professional beard grooming and shaping',
//         price: 150,
//         duration: 20,
//         image: 'https://example.com/images/beard-trim.jpg',
//         category: categoryMap['For men'],
//         isActive: true
//       },
//       {
//         name: 'Men\'s Facial',
//         description: 'Facial treatment designed for men\'s skin',
//         price: 450,
//         duration: 45,
//         image: 'https://example.com/images/mens-facial.jpg',
//         category: categoryMap['For men'],
//         isActive: true
//       }
//     );

//     // Thêm dịch vụ cho các category khác...
//     // Eyelashes
//     serviceData.push(
//       {
//         name: 'Classic Lash Extensions',
//         description: 'Natural-looking eyelash extensions',
//         price: 700,
//         duration: 90,
//         image: 'https://example.com/images/classic-lash.jpg',
//         category: categoryMap['Eyelashes'],
//         isActive: true
//       },
//       {
//         name: 'Volume Lashes',
//         description: 'Full, dramatic lash extensions',
//         price: 900,
//         duration: 120,
//         image: 'https://example.com/images/volume-lash.jpg',
//         category: categoryMap['Eyelashes'],
//         isActive: true
//       }
//     );

//     // Body
//     serviceData.push(
//       {
//         name: 'Swedish Massage',
//         description: 'Classic relaxation massage',
//         price: 600,
//         duration: 60,
//         image: 'https://example.com/images/swedish-massage.jpg',
//         category: categoryMap['Body'],
//         isActive: true
//       },
//       {
//         name: 'Deep Tissue Massage',
//         description: 'Therapeutic massage targeting muscle tension',
//         price: 700,
//         duration: 60,
//         image: 'https://example.com/images/deep-tissue.jpg',
//         category: categoryMap['Body'],
//         isActive: true
//       }
//     );

//     return await ServiceModel.insertMany(serviceData);
//   } catch (error) {
//     console.error("Error creating services:", error);
//     throw error;
//   }
// };

// // Function to run seeder independently
// const seedServices = async () => {
//   try {
//     // First clear existing services
//     await ServiceModel.deleteMany({});
    
//     // Get categories from database
//     const categories = await Category.find({});
    
//     // Create services
//     const result = await createLuminovaServices(categories);
//     console.log(`${result.length} services created successfully`);
//     return result;
//   } catch (error) {
//     console.error("Error seeding services:", error);
//     throw error;
//   }
// };

// module.exports = {
//   seedService: createLuminovaServices,
//   seedServices
// };