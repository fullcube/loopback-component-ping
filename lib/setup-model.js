/* eslint global-require: 0 */
const debug = require('debug')('loopback:component:ping')
const modelDefinition = require('./models/ping.json')

// Remove properties that will confuse LB
function getModelSettings(def) {
  const settings = {}

  for (const s in def) {
    if (def.hasOwnProperty(s)) {
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

  if (typeof options.modelName !== 'undefined') {
    debug(`Overwriting model name to ${options.modelName} (default = Ping)`)
    modelDefinition.name = modelDefinition.plural = options.modelName
  }

  const ds = app.loopback.createDataSource('transient', { connector: 'transient' })
  const newModel = ds.createModel(
    modelDefinition.name,
    modelDefinition.properties,
    getModelSettings(modelDefinition)
  )

  const Model = require('./models/ping')(newModel, options)

  app.model(Model)
}

