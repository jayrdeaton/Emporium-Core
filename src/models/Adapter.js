module.exports = class Adapter {
  constructor(data) {
    Object.assign(this, data)
  }
  async create(schema, body, query) {
    throw new Error('Emporium adapter.create not configured')
  }
  async delete(schema, body) {
    throw new Error('Emporium adapter.delete not configured')
  }
  async find(schema, identifier, query) {
    throw new Error('Emporium adapter.find not configured')
  }
  async get(schema, query) {
    throw new Error('Emporium adapter.get not configured')
  }
  async update(schema, body, query) {
    throw new Error('Emporium adapter.update not configured')
  }
}
