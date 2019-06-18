'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  majorOrOrganizationalUnit: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  title: String,
  enabled: {
    type: Boolean,
    default: true
  },
  programAffiliations: [{
    type: Schema.Types.ObjectId,
    ref: 'programs'
  }]
})

module.exports = mongoose.model('users', userSchema)
