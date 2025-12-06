const express = require('express');
const cors = require('cors');
const application = express();

// Import các routes
const recordRoutes = require('./router/studentRouter');

// Middleware configuration
application.use(cors());
application.use(express.json());
application.use(express.urlencoded({ extended: true }));

// Root endpoint
application.get('/', (req, res) => {
  res.json({ message: 'Chào mừng đến với Express API' });
});

// API Routes configuration
application.use('/api/students', recordRoutes);

// Handler cho route không tồn tại
application.use((req, res) => {
  res.status(404).json({ message: 'Đường dẫn không tìm thấy' });
});

// Middleware xử lý lỗi toàn cục
application.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Đã xảy ra lỗi hệ thống!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

module.exports = application;