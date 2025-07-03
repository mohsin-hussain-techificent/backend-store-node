require('dotenv').config();
const { User, Category, Product, sequelize } = require('../models');

const sampleCategories = [
  {
    name: 'Laundry',
    description: 'Washing machines, dryers, and laundry accessories'
  },
  {
    name: 'Jewelry',
    description: 'Rings, necklaces, earrings, and fashion accessories'
  },
  {
    name: 'Cosmetics',
    description: 'Makeup, skincare, and beauty products'
  },
  {
    name: 'Electronics',
    description: 'Gadgets, accessories, and electronic devices'
  },
  {
    name: 'Fashion',
    description: 'Clothing, shoes, and fashion accessories'
  }
];

const sampleProducts = [
  // Laundry products
  {
    name: 'Samsung Front Load Washing Machine',
    description: 'Energy efficient 7kg front loading washing machine with diamond drum',
    price: 45000,
    originalPrice: 50000,
    imageUrl: 'https://example.com/samsung-washer.jpg',
    externalUrl: 'https://daraz.pk/samsung-washer',
    categoryName: 'Laundry',
    sortOrder: 1
  },
  {
    name: 'LG TurboWash Washing Machine',
    description: '6kg top loading washing machine with TurboWash technology',
    price: 38000,
    originalPrice: 42000,
    imageUrl: 'https://example.com/lg-washer.jpg',
    externalUrl: 'https://daraz.pk/lg-washer',
    categoryName: 'Laundry',
    sortOrder: 2
  },
  
  // Jewelry products
  {
    name: 'Gold Plated Necklace Set',
    description: 'Beautiful gold plated necklace with matching earrings',
    price: 2500,
    originalPrice: 3000,
    imageUrl: 'https://example.com/gold-necklace.jpg',
    externalUrl: 'https://daraz.pk/gold-necklace',
    categoryName: 'Jewelry',
    sortOrder: 1
  },
  {
    name: 'Silver Ring Collection',
    description: 'Set of 3 adjustable silver rings with crystal stones',
    price: 1200,
    originalPrice: 1500,
    imageUrl: 'https://example.com/silver-rings.jpg',
    externalUrl: 'https://daraz.pk/silver-rings',
    categoryName: 'Jewelry',
    sortOrder: 2
  },
  
  // Cosmetics products
  {
    name: 'Makeup Palette - Professional',
    description: '40 color eyeshadow palette with brushes included',
    price: 1800,
    originalPrice: 2200,
    imageUrl: 'https://example.com/makeup-palette.jpg',
    externalUrl: 'https://daraz.pk/makeup-palette',
    categoryName: 'Cosmetics',
    sortOrder: 1
  },
  {
    name: 'Anti-Aging Serum',
    description: 'Vitamin C serum for bright and youthful skin',
    price: 3500,
    originalPrice: 4000,
    imageUrl: 'https://example.com/vitamin-serum.jpg',
    externalUrl: 'https://daraz.pk/vitamin-serum',
    categoryName: 'Cosmetics',
    sortOrder: 2
  }
];

const seedSampleData = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Create admin user if doesn't exist
    const adminExists = await User.findOne({
      where: { email: process.env.ADMIN_EMAIL }
    });

    if (!adminExists) {
      await User.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: 'admin'
      });
      console.log('Admin user created!');
    }

    // Create categories
    console.log('Creating categories...');
    const createdCategories = {};
    
    for (const categoryData of sampleCategories) {
      const [category, created] = await Category.findOrCreate({
        where: { name: categoryData.name },
        defaults: categoryData
      });
      createdCategories[category.name] = category.id;
      console.log(`Category "${category.name}" ${created ? 'created' : 'exists'}`);
    }

    // Create products
    console.log('Creating products...');
    for (const productData of sampleProducts) {
      const { categoryName, ...productFields } = productData;
      productFields.categoryId = createdCategories[categoryName];

      const [product, created] = await Product.findOrCreate({
        where: { 
          name: productFields.name,
          categoryId: productFields.categoryId 
        },
        defaults: productFields
      });
      console.log(`Product "${product.name}" ${created ? 'created' : 'exists'}`);
    }

    console.log('Sample data seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding sample data:', error);
    process.exit(1);
  }
};

seedSampleData();