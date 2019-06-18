'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user')

const eventOrganizerSchema = new Schema({})

module.exports = User.discriminator('eventOrganizer', eventOrganizerSchema)
