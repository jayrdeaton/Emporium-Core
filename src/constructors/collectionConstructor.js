const { getValueWithType, isConstructor } = require('../helpers')

// wrapper for storables
module.exports = (emporium, schema) => {
  class Collection extends Array {
    constructor(...data) {
      super(...data)
      // instance methods
      Object.keys(schema.collectionMethods).map(k => Object.defineProperty(this, k, { value: schema.collectionMethods[k], enumerable: false }))
    }
    static get schema() { return schema }
    get schema() { return schema }
  }
  // static methods
  Object.keys(schema.collectionStaticMethods).map(k => Collection[k] = schema.collectionStaticMethods[k])
  return Collection
}
