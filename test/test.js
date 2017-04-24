'use strict'

const path = require('path')
const chai = require('chai')

const expect = chai.expect

const TEST_APP = path.join(__dirname, 'test-server')
const app = require(path.join(TEST_APP, 'server/server.js'))
const Ping = app.models.Ping

describe('Component Initialization', function() {

  it('should have a Ping method', function() {
    expect(Ping).to.itself.respondTo('ping')
  })

})

describe('Method result', function() {

  it('should have a Ping method', () => Ping.ping()
    .then(res => {
      expect(res).to.have.property('application')
      expect(res).to.have.property('environment')
      expect(res).to.have.property('resources')
      expect(res).to.have.property('system')
      expect(res).to.have.property('timestamp')
      expect(res).to.have.property('uptime')
      expect(Object.keys(res).length).to.equal(6)
    })
  )

  it('should have a Ping method', () => Ping.ping({ application: false, environment: false })
    .then(res => {
      expect(res).to.not.have.property('application')
      expect(res).to.not.have.property('environment')
      expect(res).to.have.property('resources')
      expect(res).to.have.property('system')
      expect(res).to.have.property('timestamp')
      expect(res).to.have.property('uptime')
      expect(Object.keys(res).length).to.equal(4)
    })
  )

})
