const request = require('request')

const api = request.defaults({
  baseUrl: 'http://localhost:8080/api',
  json: true
})

describe('Events API Tests:', () => {
  let jwtToken = ''

  beforeAll(done => {
    api.post({
      url: '/login',
      body: {
        username: 'admin1',
        password: '123'
      }
    }, (err, res, body) => {
      if (err) throw err
      expect(res.statusCode).toBe(200)
      jwtToken = body.token
      done()
    })
  })

  it('Create a new event (Success)', done => {
    api.post({
      url: '/events',
      headers: {
        Authorization: 'Bearer ' + jwtToken
      },
      body: {
        name: 'Test Event',
        description: 'this is a test event',
        location: 'outer space',
        startTime: new Date(),
        endTime: new Date()
      }
    }, (err, res, body) => {
      if (err) throw err
      expect(res.statusCode).toBe(200)
      expect(body.name).toBe('test event')
      expect(body.location).toBe('outer space')
      done()
    })
  })

  it('Create a new event (Failure)', done => {
    api.post({
      url: '/events',
      headers: {
        Authorization: 'Bearer ' + jwtToken
      },
      body: {
        location: 'outer space',
        startTime: new Date(),
        endTime: new Date()
      }
    }, (err, res, body) => {
      if (err) throw err
      expect(res.statusCode).toBe(400)
      done()
    })
  })

  it('Approve/reject an event (Success)', done => {
    api.patch({
      url: '/events/5bfc5aed4b560a2238a1f8a1',
      headers: {
        Authorization: 'Bearer ' + jwtToken
      }
    }, (err, res, body) => {
      if (err) throw err
      expect(res.statusCode).toBe(200)
      expect(body.approved).toBe(true)
      done()
    })
  })

  it('Approve/reject an event (Failure)', done => {
    api.patch({
      url: '/events/5bfc5aed4b560a2238a1f8a1'
    }, (err, res, body) => {
      if (err) throw err
      expect(res.statusCode).toBe(401)
      done()
    })
  })

  it('Add an attendee to an event', done => {
    api.post({
      url: '/events/5bfc5aed4b560a2238a1f8a1/attendees?userId=5bfc60c93c02fc4b18f2d6ea',
      headers: {
        Authorization: 'Bearer ' + jwtToken
      }
    }, (err, res, body) => {
      if (err) throw err
      expect(res.statusCode).toBe(200)
      expect(body.length).toBe(3)
      done()
    })
  })

  it('Get all attendees of an event', done => {
    api.get({
      url: '/events/5bfc5aed4b560a2238a1f8a1/attendees',
      headers: {
        Authorization: 'Bearer ' + jwtToken
      }
    }, (err, res, body) => {
      if (err) throw err
      expect(res.statusCode).toBe(200)
      expect(body[0].firstName).toBe('John')
      done()
    })
  })
})
