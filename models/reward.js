'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rewardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true
  },
  period: {
    type: String,
    required: true
  },
  qualifiedEvents: [{
    type: Schema.Types.ObjectId,
    ref: 'events'
  }],
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'tags'
  }],
  criteria: {
    type: Number,
    required: true
  },
  approved: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('rewards', rewardSchema)
