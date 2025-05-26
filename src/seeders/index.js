// const mongoose = require('mongoose');
// const { seedCategories } = require('./dataCategory');
// const { seedServices } = require('./dataService');
// const { seedLocations } = require('./dataLocation');
// const { seedBusinesses } = require('./dataBusiness');

// const connectDB = async () => {
//   try {
//     const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/luminova';
//     await mongoose.connect(mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     process.exit(1);
//   }
// };

// // const runSeeders = async () => {
// //   try {
// //     console.log('Starting data seeding...');
    
// //     console.log('Seeding categories...');
// //     await seedCategories();
    
// //     console.log('Seeding services...');
// //     await seedServices();
    
// //     console.log('Seeding locations...');
// //     await seedLocations();
    
// //     console.log('Seeding businesses...');
// //     await seedBusinesses();
    
// //     console.log('All data seeded successfully!');
// //     process.exit(0);
// //   } catch (error) {
// //     console.error('Error seeding data:', error);
// //     process.exit(1);
// //   }
// // };

// // // Run the seeders
// // connectDB().then(() => {
// //   runSeeders();
// // }); 