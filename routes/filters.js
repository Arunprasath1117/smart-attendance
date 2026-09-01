const express = require('express');
const Attendance = require('../models/Attendance');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Advanced filter for attendance
router.post('/attendance', authenticate, async (req, res) => {
  try {
    const { projectId, startDate, endDate, status, department, minHours } = req.body;
    const filter = {};

    if (projectId) filter.projectId = projectId;
    if (status) filter.status = status;
    if (minHours) filter.hoursWorked = { $gte: minHours };

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const records = await Attendance.find(filter)
      .populate({
        path: 'userId',
        select: 'name email department',
        match: department ? { department } : {}
      })
      .populate('projectId', 'name');

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
