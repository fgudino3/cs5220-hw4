require('dotenv').config()

// mongoose connection
const mongoose = require('mongoose')
mongoose.connection.on('connected', () =>
  console.log(`Mongoose connected to ${process.env.DBURL}`)
)
mongoose.connection.on('disconnected', () =>
  console.log('Mongoose disconnected.')
)
mongoose.connect(process.env.DBURL, { useCreateIndex: true, useNewUrlParser: true })

// necessary modules
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

// view routers
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

// no authorization routers
const usersApiController = require('./api/users')
const programsApiController = require('./api/programs')

// authorization routers
const programsAuthApiController = require('./api/programsAuth')
const eventsAuthApiController = require('./api/events')

// create express app
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// general middleware
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// no authorization router middleware
app.use('/', indexRouter)
app.use('/users', usersRouter)

app.use('/api', usersApiController)
app.use('/api/programs', programsApiController)

// give the app authorization
const passport = require('./passport')
app.use(passport.initialize())
app.use(
  '/api/',
  passport.authenticate('jwt', {
    session: false,
    failWithError: true
  })
)

// authorization router middleware
app.use('/api/programs', programsAuthApiController)
app.use('/api/events', eventsAuthApiController)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

async function shutdown (signal, callback) {
  console.log(`${signal} received.`)
  await mongoose.disconnect()
  if (typeof callback === 'function') callback()
  else process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
process.once('SIGUSR2', signal => {
  shutdown(signal, () => process.kill(process.pid, 'SIGUSR2'))
})

module.exports = app
