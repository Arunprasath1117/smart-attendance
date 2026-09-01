const express = require('express');
const Attendance = require('../models/Attendance');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Check In
router.post('/check-in', authenticate, async (req, res) => {
  try {
    const { projectId } = req.body;
    const userId = req.user.id;
    const today = new Date().toDateString();

    let attendance = await Attendance.findOne({
      userId,
      projectId,
      date: { $gte: new Date(today) }
    });

    if (!attendance) {
      attendance = new Attendance({
        userId,
        projectId,
        date: new Date(),
        checkInTime: new Date(),
        status: 'present'
      });
    }

    await attendance.save();
    res.json({ message: 'Check-in successful', attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check Out
router.post('/check-out', authenticate, async (req, res) => {
  try {
    const { projectId } = req.body;
    const userId = req.user.id;
    const today = new Date().toDateString();

    const attendance = await Attendance.findOne({
      userId,
      projectId,
      date: { $gte: new Date(today) }
    });

    if (!attendance) return res.status(400).json({ error: 'No check-in found' });

    attendance.checkOutTime = new Date();
    const hours = (attendance.checkOutTime - attendance.checkInTime) / (1000 * 60 * 60);
    attendance.hoursWorked = Math.round(hours * 2) / 2;

    await attendance.save();
    res.json({ message: 'Check-out successful', attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get attendance records with filter
router.get('/records', authenticate, async (req, res) => {
  try {
    const { userId, projectId, startDate, endDate, status } = req.query;
    const filter = {};

    if (userId) filter.userId = userId;
    if (projectId) filter.projectId = projectId;
    if (status) filter.status = status;

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const records = await Attendance.find(filter)
      .populate('userId', 'name email')
      .populate('projectId', 'name');

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
