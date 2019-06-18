'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'tags'
  }],
  attendees: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  approved: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('events', eventSchema)
