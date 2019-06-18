const express = require('express')
const router = express.Router()
const Program = require('../models/program')
let accessError = new Error('User must be an admin to perform this action')
accessError.status = 401

/**
 * Create a new program
 * @param program object
 * @returns a new program
 */
router.post('/', (req, res, next) => {
  if (req.user.__t === 'admin') {
    Program.create(req.body)
      .then(program => res.json(program))
      .catch(err => {
        err.status = 400
        next(err)
      })
  } else {
    return next(accessError)
  }
})

/**
 * Edit a program
 * @param program object
 * @returns an edited program
 */
router.put('/:id', (req, res, next) => {
  if (req.user.__t === 'admin') {
    Program.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(program => res.json(program))
      .catch(err => next(err))
  } else {
    return next(accessError)
  }
})

module.exports = router
