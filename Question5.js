// Import required modules
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Express application
const app = express();
const PORT = 3000;

// Set up Sequelize connection to MySQL database
const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost', // Change this if your database is hosted remotely
  dialect: 'mysql', // Specifies that we are using MySQL
  logging: false, // Disable logging for cleaner console output
});

// Define User model corresponding to 'users' table
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Ensures email format validation
    },
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active', // Default status
  },
}, {
  tableName: 'users', // Explicitly defining the table name
  timestamps: false, // Disables createdAt and updatedAt fields
});

// Define a route to fetch all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll(); // Fetch all users from the database
    res.json(users); // Return users as JSON response
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Test database connection and start the server
(async () => {
  try {
    await sequelize.authenticate(); // Check database connection
    console.log('Connected to MySQL database successfully.');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();