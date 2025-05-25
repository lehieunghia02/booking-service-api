const Category = require('../models/Category');

const categoryData = [
    {
      name: 'Manicure',
      description: 'Professional nail care services focusing on beautifying hands and nails',
      image: 'https://example.com/images/manicure.jpg',
      is_popular: true,
      display_order: 1,
      is_active: true
    },
    {
      name: 'Hair',
      description: 'Complete hair services including cuts, styling, coloring, and treatments',
      image: 'https://example.com/images/hair.jpg',
      is_popular: true,
      display_order: 2,
      is_active: true
    },
    {
      name: 'Face',
      description: 'Facial treatments for skin health, beauty, and rejuvenation',
      image: 'https://example.com/images/face.jpg',
      is_popular: true,
      display_order: 3,
      is_active: true
    },
    {
      name: 'For men',
      description: 'Specialized grooming and wellness services for men',
      image: 'https://example.com/images/for-men.jpg',
      is_popular: true,
      display_order: 4,
      is_active: true
    },
    {
      name: 'Eyelashes',
      description: 'Eyelash extensions, lifting, and tinting for enhanced eye beauty',
      image: 'https://example.com/images/eyelashes.jpg',
      is_popular: true,
      display_order: 5,
      is_active: true
    },
    {
      name: 'Body',
      description: 'Body treatments, massages, and therapies for relaxation and wellness',
      image: 'https://example.com/images/body.jpg',
      is_popular: true,
      display_order: 6,
      is_active: true
    },
    {
      name: 'Hair removal',
      description: 'Various hair removal techniques including waxing, laser, and threading',
      image: 'https://example.com/images/hair-removal.jpg',
      is_popular: true,
      display_order: 7,
      is_active: true
    },
    {
      name: 'Eyebrow',
      description: 'Eyebrow shaping, tinting, and microblading services',
      image: 'https://example.com/images/eyebrow.jpg',
      is_popular: true,
      display_order: 8,
      is_active: true
    },
    {
      name: 'Tanning',
      description: 'Sunless tanning services for a natural-looking glow',
      image: 'https://example.com/images/tanning.jpg',
      is_popular: true,
      display_order: 9,
      is_active: true
    },
    {
      name: 'Makeup',
      description: 'Professional makeup application for all occasions',
      image: 'https://example.com/images/makeup.jpg',
      is_popular: true,
      display_order: 10,
      is_active: true
    },
    {
      name: 'Self care',
      description: 'Wellness and relaxation services for mind and body',
      image: 'https://example.com/images/self-care.jpg',
      is_popular: true,
      display_order: 11,
      is_active: true
    },
    {
      name: "Women's haircut",
      description: "Professional haircuts and styling for women",
      image: 'https://example.com/images/womens-haircut.jpg',
      is_popular: true,
      display_order: 12,
      is_active: true
    },
    {
      name: "Men's haircut",
      description: "Professional haircuts and grooming for men",
      image: 'https://example.com/images/mens-haircut.jpg',
      is_popular: true,
      display_order: 13,
      is_active: true
    },
    {
      name: "Lash lifting",
      description: "Semi-permanent curling treatment for natural lashes",
      image: 'https://example.com/images/lash-lifting.jpg',
      is_popular: true,
      display_order: 14,
      is_active: true
    },
    {
      name: "Volume lashes",
      description: "Full volume eyelash extensions for a dramatic look",
      image: 'https://example.com/images/volume-lashes.jpg',
      is_popular: true,
      display_order: 15,
      is_active: true
    },
    {
      name: "Laser treatment",
      description: "Advanced laser treatments for skin rejuvenation and hair removal",
      image: 'https://example.com/images/laser-treatment.jpg',
      is_popular: true,
      display_order: 16,
      is_active: true
    }
  ];

const seedCategories = async () => {
  try {
    await Category.deleteMany();
    await Category.insertMany(categoryData);
  } catch (error) {
    console.error("Error seeding categories:", error);
    process.exit(1);
  }
};


module.exports = { seedCategories };
