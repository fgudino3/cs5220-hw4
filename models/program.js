'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const programSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  fullName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('programs', programSchema)
