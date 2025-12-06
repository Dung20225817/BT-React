const Student = require('../model/Student');

// Lấy danh sách tất cả học sinh
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tạo học sinh mới
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Lấy học sinh theo ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Không tìm thấy học sinh' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật học sinh
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!student) {
      return res.status(404).json({ error: 'Không tìm thấy học sinh' });
    }
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Xóa học sinh
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Không tìm thấy học sinh' });
    }
    res.json({ message: 'Đã xóa học sinh thành công', student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
