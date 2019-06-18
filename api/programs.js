const express = require('express')
const router = express.Router()
const Program = require('../models/program')

/**
 * Get all programs
 * @returns all programs
 */
router.get('/', (req, res, next) => {
  Program.find({})
    .then(programs => res.json(programs))
    .catch(err => next(err))
})

/**
 * Get a program (by id)
 * @returns a program
 */
router.get('/:id', (req, res, next) => {
  Program.findById(req.params.id)
    .then(program => res.json(program))
    .catch(err => next(err))
})

module.exports = router
