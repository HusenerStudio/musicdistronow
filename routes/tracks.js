const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const Track = require('../models/Track');

// Set up storage for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB limit
  fileFilter: function(req, file, cb) {
    if (file.fieldname === 'audioFile') {
      if (!file.originalname.match(/\.(mp3|wav|flac)$/)) {
        return cb(new Error('Only audio files are allowed!'), false);
      }
    } else if (file.fieldname === 'coverArt') {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
      }
    }
    cb(null, true);
  }
});

// @route   POST api/tracks
// @desc    Upload a new track
// @access  Private
router.post('/', upload.fields([
  { name: 'audioFile', maxCount: 1 },
  { name: 'coverArt', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, artist, genre } = req.body;
    
    // Create new track
    const newTrack = new Track({
      user: req.user.id, // This will come from auth middleware
      title,
      artist,
      genre,
      coverArt: req.files.coverArt[0].path,
      audioFile: req.files.audioFile[0].path,
      platforms: [
        { name: 'Spotify', distributed: false },
        { name: 'Apple Music', distributed: false },
        { name: 'Amazon Music', distributed: false },
        { name: 'YouTube Music', distributed: false }
      ]
    });

    const track = await newTrack.save();
    res.json(track);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tracks
// @desc    Get all tracks for a user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const tracks = await Track.find({ user: req.user.id }).sort({ date: -1 });
    res.json(tracks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tracks/:id
// @desc    Get track by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    
    if (!track) {
      return res.status(404).json({ msg: 'Track not found' });
    }

    // Check user
    if (track.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    res.json(track);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Track not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;