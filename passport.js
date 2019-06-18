const passport = require('passport')
const passportJWT = require('passport-jwt')

passport.use(new passportJWT.Strategy({
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
}, (payload, done) => {
  return done(null, payload)
}))

module.exports = passport
