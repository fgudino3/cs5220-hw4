'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user')

const adminSchema = new Schema({})

module.exports = User.discriminator('admin', adminSchema)
