'use strict'

const debug = require('debug')('loopback:component:ping')
const modelDefinition = require('./models/ping.json')
const ping = require('./models/ping')

// Remove properties that will confuse LB
function getModelSettings(def) {
  const settings = {}

  for (const s in def) {
    if (Object.prototype.hasOwnProperty.call(def, s)) {
      if (s !== 'name' || s !== 'properties') {
        settings[s] = def[s]
      }
    }
  }
  return settings
}

module.exports = function setupModelFn(app, options) {
  debug('setupModelFn')

  if (typeof options.acls === 'object') {
    debug('Enable ACL')
    debug(options.acls)
    modelDefinition.acls = options.acls
  }
  else {
    debug('No ACL (default)')
    modelDefinition.acls = []
  }

  if (app.loopback.version.startsWith(2)) {
    modelDefinition.methods.ping.isStatic = true
  }

  if (typeof options.modelName !== 'undefined') {
    debug(`Overwriting model name to ${options.modelName} (default = Ping)`)
    modelDefinition.name = options.modelName
    modelDefinition.plural = options.modelName
  }

  const ds = app.loopback.createDataSource('transient', { connector: 'transient' })
  const newModel = ds.createModel(
    modelDefinition.name,
    modelDefinition.properties,
    getModelSettings(modelDefinition)
  )

  const Model = ping(newModel, options)

  app.model(Model)
}
