const express = require('express');
const Project = require('../models/Project');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Create project
router.post('/', authenticate, async (req, res) => {
  try {
    const { name, description, startDate, endDate, manager, teamMembers } = req.body;

    const project = new Project({
      name,
      description,
      startDate,
      endDate,
      manager,
      teamMembers
    });

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all projects
router.get('/', authenticate, async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('manager', 'name email')
      .populate('teamMembers', 'name email');

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get project by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('manager', 'name email')
      .populate('teamMembers', 'name email');

    if (!project) return res.status(404).json({ error: 'Project not found' });

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
