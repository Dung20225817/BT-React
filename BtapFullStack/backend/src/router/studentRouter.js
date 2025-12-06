const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');

// GET - Lấy danh sách tất cả học sinh
router.get('/', studentController.getAllStudents);

// POST - Tạo học sinh mới
router.post('/', studentController.createStudent);

// GET - Lấy học sinh theo ID
router.get('/:id', studentController.getStudentById);

// PUT - Cập nhật học sinh
router.put('/:id', studentController.updateStudent);

// DELETE - Xóa học sinh
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
