'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
  name: String
})

module.exports = mongoose.model('tags', tagSchema)
