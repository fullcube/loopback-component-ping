const Promise = require('bluebird')
const _ = require('lodash')
const debug = require('debug')('loopback:component:ping')
const health = require('express-ping')

module.exports = function pingModelFn(Ping, options) {

  // Because lodash does not have a built-in method to sort an object by key
  function sortObj(obj) {
    return _(obj).toPairs().sortBy(0).fromPairs().value()
  }

  Ping.ping = parts => new Promise((resolve, reject) => {
    parts = parts || options.parts
    health.info((err, data) => {
      if (err) {
        return reject(err)
      }

      // Add the ENV VARS to the results
      data.environment = sortObj(process.env)

      // Remove the parts that are disabled in the config
      _.forEach(parts, (value, part) => {
        if (value === false) {
          debug(`Removing part '${part}' from result`)
          delete data[part]
        }
      })

      return resolve(sortObj(data))
    })
  })

  return Ping
}
