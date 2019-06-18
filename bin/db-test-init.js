const mongoose = require('mongoose')
const User = require('../models/user')
const Admin = require('../models/admin')
const EventOrganizer = require('../models/eventOrganizer')
const Program = require('../models/program')
const Event = require('../models/event')
const Tag = require('../models/tag')

// connection handlers
mongoose.connection.on('connected', () => console.log('Mongoose connected.'))
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected.'))

// drop, populate, and query
const run = async () => {
  await mongoose.connect('mongodb://localhost/gudino-sci-cafe', { useCreateIndex: true, useNewUrlParser: true })

  // Delete existing collections
  await User.deleteMany({})
  await Program.deleteMany({})
  await Event.deleteMany({})
  await Tag.deleteMany({})

  // sample programs
  const p1 = await Program.create({
    _id: mongoose.Types.ObjectId('5bee0b7f28883247d4205b42'),
    name: 'P1',
    fullName: 'Program 1',
    description: 'This is the first program'
  })

  const p2 = await Program.create({
    name: 'P2',
    fullName: 'Program 2',
    description: 'This is the second program'
  })

  // sample users
  await Admin.create({
    _id: mongoose.Types.ObjectId('5bfc60c93c02fc4b18f2d6ea'),
    firstName: 'John',
    lastName: 'Smith',
    position: 'Admin',
    majorOrOrganizationalUnit: 'CS',
    username: 'admin1',
    password: '123',
    email: 'admin1@email.com'
  })

  const john = await EventOrganizer.create({
    firstName: 'John',
    lastName: 'Doe',
    position: 'Student',
    majorOrOrganizationalUnit: 'CS',
    username: 'jodoe',
    password: '123',
    email: 'john@email.com',
    programAffiliations: [p1, p2]
  })

  const jane = await User.create({
    firstName: 'Jane',
    lastName: 'Doe',
    position: 'Student',
    majorOrOrganizationalUnit: 'CS',
    username: 'jadoe',
    password: '123',
    email: 'jane@email.com',
    programAffiliations: [p2]
  })

  // sample tags
  const tag1 = await Tag.create({
    name: 'computer science'
  })

  const tag2 = await Tag.create({
    name: 'Web Dev'
  })

  // sample events
  await Event.create({
    _id: mongoose.Types.ObjectId('5bfc5aed4b560a2238a1f8a1'),
    name: 'Event 1',
    description: 'first sample event',
    location: 'CSULA KHB1009',
    startTime: new Date(),
    endTime: new Date(),
    attendees: [john, jane],
    tags: [tag1, tag2]
  })

  await Event.create({
    name: 'Event 2',
    description: 'second sample event',
    location: 'CSULA KHB1009',
    startTime: new Date(),
    endTime: new Date()
  })

  console.log('database initialized')

  await mongoose.disconnect()
}

run()
  .catch(err => {
    console.log(err)
    mongoose.disconnect()
  })
