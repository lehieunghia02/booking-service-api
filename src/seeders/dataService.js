
// Tạo businesses theo landing page (Popular salons và Popular individuals)
const createLuminovaBusinesses = async (locations, services, categories) => {
  // Tìm Stockholm location
  const stockholm = locations.find(loc => loc.name === 'Stockholm');
  
  // Businesses
  const businessData = [
    // Popular Salons - như hiện thị trong landing page
    {
      name: 'Opulent Beauty Clinic',
      description: 'Luxurious beauty clinic offering a range of premium services',
      location: stockholm._id,
      services: services.slice(0, 5).map(s => s._id), // Lấy 5 dịch vụ đầu tiên
      images: 'https://example.com/images/opulent-beauty.jpg',
      is_active: true
    },
    {
      name: 'Fashionable Elegance',
      description: 'Trendy salon focusing on the latest beauty innovations',
      location: stockholm._id,
      services: services.slice(3, 8).map(s => s._id),
      images: 'https://example.com/images/fashionable-elegance.jpg',
      is_active: true
    },
    {
      name: 'Glamorous Glow',
      description: 'Specializing in services that enhance your natural beauty',
      location: stockholm._id,
      services: services.slice(6, 12).map(s => s._id),
      images: 'https://example.com/images/glamorous-glow.jpg',
      is_active: true
    },
    {
      name: 'Serene Spa & Clinic',
      description: 'Peaceful environment offering both spa and clinical beauty treatments',
      location: stockholm._id,
      services: services.slice(9, 15).map(s => s._id),
      images: 'https://example.com/images/serene-spa.jpg',
      is_active: true
    },
    
    // Popular Individuals - như hiển thị trên landing page
    {
      name: 'Irina Kumashkova',
      description: 'Expert beautician with 10+ years of experience',
      location: stockholm._id,
      services: [services[0]._id, services[3]._id, services[6]._id],
      images: 'https://example.com/images/irina-k.jpg',
      is_active: true,
      is_individual: true
    },
    {
      name: 'Valéry Martineau',
      description: 'French-trained hair stylist specialized in color transformations',
      location: stockholm._id,
      services: [services[1]._id, services[4]._id, services[7]._id],
      images: 'https://example.com/images/valery-m.jpg',
      is_active: true,
      is_individual: true
    },
    {
      name: 'Olivia Bonderhaven',
      description: 'Certified lash technician and makeup artist',
      location: stockholm._id,
      services: [services[2]._id, services[5]._id, services[8]._id],
      images: 'https://example.com/images/olivia-b.jpg',
      is_active: true,
      is_individual: true
    },
    {
      name: 'Anna Eriksdotter',
      description: 'Specialized in skincare and facial treatments',
      location: stockholm._id,
      services: [services[2]._id, services[5]._id, services[11]._id],
      images: 'https://example.com/images/anna-e.jpg',
      is_active: true,
      is_individual: true
    }
  ];

  return await Business.insertMany(businessData);
};


module.exports = { createLuminovaBusinesses };
