const pluralize = require('pluralize'),
  { isConstructor } = require('../helpers')

module.exports = class Schema {
  constructor(emporium, name, attributes, options) {
    if (!attributes) attributes = {}
    // name
    this.name = name
    // options
    if (!options) options = {}
    let { adapter, afterStorage, beforeStorage, collectionMethods, collectionStaticMethods, discarded, hidden, identifier, locked, methods, readable, required, resourceName, staticMethods, strict, writable } = options

    if (options.extends) {
      let extended
      if (typeof options.extends === 'string') {
        const Extension = emporium.models[options.extends]
        if (!Extension) throw new Error(`${schema.name} can't find extension ${options.extends}`)
        extended = Object.assign({}, Extension.schema)
      } else if (isConstructor(options.extends)) {
        extended = Object.assign({}, options.extends.schema)
      } else {
        throw new Error(`${schema.name} has an unknown extension type`)
      }
      this.extends = extended

      attributes = Object.assign({}, extended.attributes, attributes)

      if (!adapter) adapter = extended.adapter
      if (!afterStorage) afterStorage = extended.afterStorage
      if (!beforeStorage) beforeStorage = extended.beforeStorage
      if (discarded) discarded = discarded.push(...extended.discarded)
      if (hidden) hidden = hidden.push(...extended.hidden)
      if (!identifier) identifier = extended.identifier
      if (locked) locked = locked.push(...extended.locked)
      if (readable === undefined) readable = extended.readable
      if (required) required = required.push(...extended.required)
      // if (!resourceName) resourceName = extended.resourceName
      if (strict === undefined) strict = extended.strict
      if (writable === undefined) writable = extended.writable
      methods = Object.assign(methods || {}, extended.methods)
      staticMethods = Object.assign(staticMethods || {}, extended.staticMethods)
      collectionMethods = Object.assign(collectionMethods || {}, extended.collectionMethods)
      collectionStaticMethods = Object.assign(collectionStaticMethods || {}, extended.collectionStaticMethods)
    }

    this.adapter = adapter
    this.afterStorage = afterStorage
    this.beforeStorage = beforeStorage
    this.discarded = discarded || []
    this.hidden = hidden || []
    this.identifier = identifier
    this.locked = locked || []
    this.readable = readable === false ? false : true
    this.required = required || []
    this.resourceName = resourceName ? resourceName : pluralize(name).toLowerCase()
    this.strict = strict === false ? false : true
    this.writable = writable === false ? false : true
    this.methods = methods || {}
    this.staticMethods = staticMethods || {}
    this.collectionMethods = collectionMethods || {}
    this.collectionStaticMethods = collectionStaticMethods || {}

    // attributes
    this.attributes = attributes
    for (const key of Object.keys(attributes)) {
      const value = attributes[key]
      if (typeof value === 'object') {
        if (!value.type) throw new Error(`Schema attribute '${key}' requires a type`)
        if (value.hidden) this.hidden.push(key)
        if (value.discarded) this.discarded.push(key)
        if (value.readOnly || value.locked) this.locked.push(key)
        if (value.required) this.required.push(key)
      }
    }
  }
}
