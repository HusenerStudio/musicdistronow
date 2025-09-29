const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  coverArt: {
    type: String,
    required: true
  },
  audioFile: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    default: Date.now
  },
  isrc: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'distributed', 'rejected'],
    default: 'pending'
  },
  platforms: [{
    name: String,
    distributed: {
      type: Boolean,
      default: false
    },
    link: String
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('track', TrackSchema);