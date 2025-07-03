require('dotenv').config();
const { User, sequelize } = require('../models');

const seedAdmin = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const adminExists = await User.findOne({
      where: { email: process.env.ADMIN_EMAIL }
    });

    if (!adminExists) {
      await User.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: 'admin'
      });
      console.log('Admin user created successfully!');
    } else {
      console.log('Admin user already exists!');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();