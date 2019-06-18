'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user')

const rewardProviderSchema = new Schema({})

module.exports = User.discriminator('rewardProvider', rewardProviderSchema)
