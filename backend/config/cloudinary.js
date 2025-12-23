const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dummy', // Set in .env
  api_key: process.env.CLOUDINARY_API_KEY || '281867269492234',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'CEHZ0vkdI4jX4IpgAiftiCTgIqo',
});

module.exports = cloudinary;

