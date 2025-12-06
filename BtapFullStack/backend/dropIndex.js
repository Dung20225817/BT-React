const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/student_db';

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Đã kết nối MongoDB');
    const db = mongoose.connection.db;
    
    try {
      // Xem dữ liệu hiện có
      const students = await db.collection('students').find().toArray();
      console.log('Số học sinh:', students.length);
      console.log('Dữ liệu:', JSON.stringify(students, null, 2));
    } catch (error) {
      console.error('Lỗi:', error.message);
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Lỗi kết nối MongoDB:', err);
    process.exit(1);
  });
