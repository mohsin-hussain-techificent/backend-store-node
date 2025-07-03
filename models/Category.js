const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: true,
    
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

// Auto-generate slug from name
// Category.beforeCreate((category) => {
//   category.slug = category.name.toLowerCase().replace(/\s+/g, '-');
// });

// Category.beforeUpdate((category) => {
//   if (category.changed('name')) {
//     category.slug = category.name.toLowerCase().replace(/\s+/g, '-');
//   }
// });

module.exports = Category;