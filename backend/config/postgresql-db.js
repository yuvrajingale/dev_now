const { Sequelize } = require('sequelize');

// Load environment variables from .env file
require('dotenv').config();

// Define the connection to PostgreSQL using Sequelize
const sequelize = new Sequelize(process.env.DATABASE, {
  dialect: 'postgres',
  logging: false, // Disable logging SQL queries (optional)
  define: {
    timestamps: true // By default, Sequelize adds createdAt and updatedAt columns to the models
  }
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL database successfully!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
