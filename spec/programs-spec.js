const request = require('request')

const api = request.defaults({
  baseUrl: 'http://localhost:8080/api',
  json: true
})

describe('Programs API Tests:', () => {
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

  it('Get all programs', done => {
    api.get({
      url: '/programs'
    }, (err, res, body) => {
      if (err) throw err
      expect(res.statusCode).toBe(200)
      expect(body[0].name).toBe('p1')
      expect(body[0].fullName).toBe('program 1')
      done()
    })
  })

  it('Get a program (by id)', done => {
    api.get({
      url: '/programs/5bee0b7f28883247d4205b42'
    }, (err, res, body) => {
      if (err) throw err
      expect(res.statusCode).toBe(200)
      expect(body.name).toBe('p1')
      expect(body.fullName).toBe('program 1')
      done()
    })
  })

  it('Create a new program (Success)', done => {
    api.post({
      url: '/programs',
      headers: {
        Authorization: 'Bearer ' + jwtToken
      },
      body: {
        name: 'tp',
        fullName: 'test program',
        description: 'this is a test'
      }
    }, (err, res, body) => {
      if (err) throw err
      expect(res.statusCode).toBe(200)
      expect(body.name).toBe('tp')
      expect(body.fullName).toBe('test program')
      done()
    })
  })

  it('Create a new program (Failure)', done => {
    api.post({
      url: '/programs',
      body: {
        name: 'tp2',
        fullName: 'test program 2',
        description: 'this is a failed test'
      }
    }, (err, res, body) => {
      if (err) throw err
      expect(res.statusCode).toBe(401)
      done()
    })
  })

  it('Edit a program', done => {
    api.put({
      url: '/programs/5bee0b7f28883247d4205b42',
      headers: {
        Authorization: 'Bearer ' + jwtToken
      },
      body: {
        name: 'p1',
        fullName: 'program 1',
        description: 'This is the first program edited now'
      }
    }, (err, res, body) => {
      if (err) throw err
      expect(res.statusCode).toBe(200)
      done()
    })
  })
})
