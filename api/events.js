const express = require('express')
const router = express.Router()
const Event = require('../models/event')
const User = require('../models/user')
let accessError = new Error('User must be an admin to perform this action')
accessError.status = 401

/**
 * Create a new event
 * @param event object
 * @returns a new event
 */
router.post('/', (req, res, next) => {
  let newEvent = req.body

  if (req.user.__t === 'eventOrganizer') {
    newEvent.approved = true
  }

  Event.create(newEvent)
    .then(event => res.json(event))
    .catch(err => {
      err.status = 400
      next(err)
    })
})

/**
 * Approve/reject an event
 * @param event object
 * @returns an event with the opposite aprroval
 */
router.patch('/:id', (req, res, next) => {
  if (req.user.__t === 'admin') {
    Event.findById(req.params.id)
      .then(event => Event.findByIdAndUpdate(req.params.id, { approved: !event.approved }, { new: true }))
      .then(event => res.json(event))
      .catch(err => next(err))
  } else {
    return next(accessError)
  }
})

/**
 * Add an attendee to an event
 * @param userId
 * @returns an updated array of user objects
 */
router.post('/:id/attendees', (req, res, next) => {
  if (req.user.__t === 'admin') {
    User.findById(req.query.userId)
      .then(user => Event.findByIdAndUpdate(req.params.id, {
        $push: {
          attendees: user
        }
      }, { new: true })
        .populate({
          path: 'attendees',
          populate: { path: 'programAffiliations' }
        })
      )
      .then(event => res.json(event.attendees))
      .catch(err => next(err))
  } else {
    return next(accessError)
  }
})

/**
 * Get all attendees of an event
 * @returns an array of user objects
 */
router.get('/:id/attendees', (req, res, next) => {
  if (req.user.__t === 'admin') {
    Event.findById(req.params.id, { attendees: true })
      .populate({
        path: 'attendees',
        populate: { path: 'programAffiliations' }
      })
      .then(event => res.json(event.attendees))
      .catch(err => next(err))
  } else {
    return next(accessError)
  }
})

module.exports = router
