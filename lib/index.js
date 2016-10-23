/* eslint filenames/match-regex: 0 */
'use strict'

const debug = require('debug')('loopback:component:ping')
const setupModel = require('./setup-model')

module.exports = function loopbackComponent(app, options) {
  debug('Loading component with options', options)
  setupModel(app, options)
}
