const request = require('request')

const api = request.defaults({
  baseUrl: 'http://localhost:8080/api',
  json: true
})

describe('Users API Tests:', () => {
  it('User Login (Success)', done => {
    api.post({
      url: '/login',
      body: {
        username: 'jodoe',
        password: '123'
      }
    }, (err, res, body) => {
      if (err) throw err
      expect(res.statusCode).toBe(200)
      done()
    })
  })

  it('User Login (Failure)', done => {
    api.post({
      url: '/login',
      body: {
        username: 'jodoe',
        password: '12345'
      }
    }, (err, res, body) => {
      if (err) throw err
      expect(res.statusCode).toBe(403)
      done()
    })
  })

  it('User Registration (Success)', done => {
    api.post({
      url: '/register',
      body: {
        firstName: 'jack',
        lastName: 'doe',
        position: 'Student',
        majorOrOrganizationalUnit: 'CS',
        username: 'jkdoe',
        password: '123',
        email: 'test@testing.com'
      }
    }, (err, res, body) => {
      if (err) throw err
      expect(res.statusCode).toBe(200)
      done()
    })
  })

  it('User Registration (Failure)', done => {
    api.post({
      url: '/register',
      body: {
        position: 'Student',
        majorOrOrganizationalUnit: 'CS'
      }
    }, (err, res, body) => {
      if (err) throw err
      expect(res.statusCode).toBe(400)
      done()
    })
  })
})
