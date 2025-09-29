const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Track = require('../models/Track');

// @route   GET api/artists
// @desc    Get all artists
// @access  Public
router.get('/', async (req, res) => {
  try {
    const artists = await User.find({ role: 'artist' })
      .select('-password')
      .sort({ date: -1 });
    res.json(artists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/artists/:id/tracks
// @desc    Get all tracks by an artist
// @access  Public
router.get('/:id/tracks', async (req, res) => {
  try {
    const tracks = await Track.find({ 
      user: req.params.id,
      status: 'distributed' 
    }).sort({ releaseDate: -1 });
    
    res.json(tracks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;