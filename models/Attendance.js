const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  checkInTime: Date,
  checkOutTime: Date,
  hoursWorked: Number,
  status: {
    type: String,
    enum: ['present', 'absent', 'late', 'half-day'],
    default: 'absent'
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
attendanceSchema.index({ userId: 1, date: 1 });
attendanceSchema.index({ projectId: 1, date: 1 });

module.exports = mongoose.model('Attendance', attendanceSchema);
