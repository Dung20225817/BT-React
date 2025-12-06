const SchoolRecord = require('../model/Student');

// Lấy toàn bộ danh sách
exports.retrieveAllRecords = async (req, res) => {
  try {
    const recordCollection = await SchoolRecord.find();
    res.json(recordCollection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tạo bản ghi mới
exports.registerNewRecord = async (req, res) => {
  try {
    const freshRecord = new SchoolRecord(req.body);
    await freshRecord.save();
    res.status(201).json(freshRecord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Tìm bản ghi theo mã ID
exports.searchRecordByIdentifier = async (req, res) => {
  try {
    const locatedRecord = await SchoolRecord.findById(req.params.id);
    if (!locatedRecord) {
      return res.status(404).json({ error: 'Bản ghi không tìm thấy' });
    }
    res.json(locatedRecord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật bản ghi
exports.reviseRecord = async (req, res) => {
  try {
    const modifiedRecord = await SchoolRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!modifiedRecord) {
      return res.status(404).json({ error: 'Không tìm thấy bản ghi để cập nhật' });
    }
    res.json(modifiedRecord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Xóa bản ghi
exports.eraseRecord = async (req, res) => {
  try {
    const removedRecord = await SchoolRecord.findByIdAndDelete(req.params.id);
    if (!removedRecord) {
      return res.status(404).json({ error: 'Không tìm thấy bản ghi để xóa' });
    }
    res.json({ message: 'Đã xóa bản ghi thành công', student: removedRecord });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
