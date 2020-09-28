const { getValueWithType, isConstructor } = require('../helpers')

module.exports = (emporium, schema) => {
  class Storable {
    constructor(data) {
      for (let attribute of Object.keys(schema.attributes)) {
        let definition = schema.attributes[attribute]
        let type
        if (typeof definition === 'object') {
          type = definition.type
          if (definition.default !== undefined) if (typeof definition.default === 'function') { this[attribute] = definition.default() } else { this[attribute] = definition.default }
        } else {
          type = definition
        }
        if (data && typeof data[attribute] !== 'undefined') this[attribute] = data[attribute]
        if (typeof this[attribute] !== 'undefined' && this[attribute] !== null) this[attribute] = getValueWithType(this[attribute], type)
      }
      if (data && !schema.strict) Object.keys(data).map(k => !Object.keys(schema.attributes).includes(k) && !Object.keys(this).includes(k) ? this[k] = data[k] : null)
      schema.hidden.map(k => Object.defineProperty(this, k, { enumerable: false }))
      schema.locked.map(k => Object.defineProperty(this, k, { writable: false }))
      Object.keys(schema.methods).map(k => Object.defineProperty(this, k, { value: schema.methods[k], enumerable: false }))
    }
    static get schema() {
      return schema
    }
    static convertObjects(data) {
      let result
      if (Array.isArray(data)) {
        result = []
        data.map(d => result.push(new this(d)))
      } else {
        result = new this(data)
      }
      return result
    }
    static removeDiscardedAttributes(data) {
      if (Array.isArray(data)) {
        data.map(d => schema.discarded.map(e => delete d[e]))
      } else {
        schema.discarded.map(e => delete data[e])
      }
      return data
    }
    static async create(body, query) {
      if (!schema.writable) throw new Error(`${schema.name} is not writable`)
      body = this.convertObjects(body)
      for (let key of schema.required) if (typeof body[key] === 'undefined' || body[key] === null) throw new Error(`${schema.name} missing required value: ${key}!`)
      if (schema.beforeStorage) schema.beforeStorage(body)
      let result = await schema.adapter.create(schema, body, query)
      if (schema.afterStorage) schema.afterStorage(result)
      return result ? this.convertObjects(result) : null
    }
    static delete(body) {
      return schema.adapter.delete(schema, body)
    }
    static async find(identifier, query) {
      if (!schema.readable) throw new Error(`${schema.name} is not readable`)
      if (!schema.identifier) return null
      if (typeof identifier === 'object') identifier = identifier[schema.identifier]
      if (!identifier) return null
      let result = await schema.adapter.find(schema, identifier, query)
      if (schema.afterStorage) schema.afterStorage(result)
      return result ? this.convertObjects(result) : null
    }
    static async get(query) {
      if (!schema.readable) throw new Error(`${schema.name} is not readable`)
      let result = await schema.adapter.get(schema, query)
      return result ? this.convertObjects(result) : []
    }
    static async update(body, query) {
      if (!schema.writable) throw new Error(`${schema.name} is not writable`)
      const updateKeys = Object.keys(body)
      body = this.convertObjects(body)
      body = this.removeDiscardedAttributes(body)
      for (let key of schema.required) if (updateKeys.includes(key)) if (typeof body[key] === 'undefined' || body[key] === null) throw new Error(`${schema.name} missing required value: ${key}!`)
      for (const key of Object.keys(body)) if (!updateKeys.includes(key)) delete body[key]
      if (schema.beforeStorage) schema.beforeStorage(body)
      let result = await schema.adapter.update(schema, body, query)
      if (schema.afterStorage) schema.afterStorage(body)
      return result ? this.convertObjects(result) : null
    }
    async save(query) {
      // return this.constructor.update(this, query)
      if (!schema.writable) throw new Error(`${schema.name} is not writable`)
      Storable.removeDiscardedAttributes(this)
      for (let key of schema.required) if (typeof this[key] === 'undefined' || this[key] === null) throw new Error(`${schema.name} missing required value: ${key}!`)
      if (schema.beforeStorage) schema.beforeStorage(this)
      const object = await schema.adapter.update(schema, this, query)
      if (schema.afterStorage) schema.afterStorage(this)
      return new this.constructor(object)
    }
    delete() {
      return schema.adapter.delete(schema, this)
    }
  }

  Object.keys(schema.staticMethods).map(k => Storable[k] = schema.staticMethods[k])

  return Storable
}
