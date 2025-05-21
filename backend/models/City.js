const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  coordinates: {
    lat: Number,
    lng: Number
  },
  connections: [{
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City'
    },
    distance: {
      type: Number,
      required: true
    }
  }],
  attractions: [{
    name: String,
    description: String,
    imageUrl: String
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('City', citySchema); 