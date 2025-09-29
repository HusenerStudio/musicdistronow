const express = require('express');
const router = express.Router();

const Track = require('../models/Track');

// @route   POST api/distributions/:id
// @desc    Submit a track for distribution
// @access  Private
router.post('/:id', async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    
    if (!track) {
      return res.status(404).json({ msg: 'Track not found' });
    }

    // Check user
    if (track.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Update track status
    track.status = 'approved';
    
    // Update platforms based on request
    const { platforms } = req.body;
    if (platforms && platforms.length > 0) {
      track.platforms = track.platforms.map(platform => {
        const selected = platforms.find(p => p.name === platform.name);
        if (selected) {
          return {
            ...platform,
            distributed: true
          };
        }
        return platform;
      });
    }

    await track.save();
    res.json(track);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/distributions
// @desc    Get all distributed tracks
// @access  Private (Admin)
router.get('/', async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const tracks = await Track.find({ status: { $in: ['approved', 'distributed'] } })
      .sort({ date: -1 });
    res.json(tracks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;