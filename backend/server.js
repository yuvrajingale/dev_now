const mongoose = require("mongoose");
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const app = require('./app');
const sequelize = require('./config/postgresql-db');

dotenv.config({path: './config.env'});

// console.log(process.env);

// Connect DB
// const DB = process.env.DATABASE;
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log('MongoDB connected successfully!'))
//   .catch(err => console.log(err));

// Sync Sequelize models with the database
sequelize.sync()
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch(err => {
    console.error('An error occurred while synchronizing models:', err);
  });
// Server build
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5001;
const server = app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err);
});

