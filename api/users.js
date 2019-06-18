const express = require('express')
const router = express.Router()
const User = require('../models/user')

const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

let credentialError = new Error('Incorrect username or password')
credentialError.status = 403

/**
 * User Login
 * @param username
 * @param password
 * @returns a token after successful login
 */
router.post('/login', (req, res, next) => {
  User.findOne({
    username: req.body.username,
    password: req.body.password
  })
    .then(user => {
      if (user === null) return next(credentialError)

      res.json({
        token: jwt.sign(user.toJSON(), jwtSecret)
      })
    })
    .catch(err => next(err))
})

/**
 * User registration
 * @param user object
 * @returns a token after successful registration
 */
router.post('/register', (req, res, next) => {
  User.create(req.body)
    .then(user => res.json({
      token: jwt.sign(user.toJSON(), jwtSecret)
    }))
    .catch(err => {
      err.status = 400
      next(err)
    })
})

module.exports = router
