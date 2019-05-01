module.exports = class Adapter {
  constructor(data) {
    Object.assign(this, data);
  };
  async create(schema, body, query) {
    throw new Error('Emporium Adapter create not configured');
  };
  async delete(schema, body) {
    throw new Error('Emporium Adapter delete not configured');
  };
  async find(schema, identifier, query) {
    throw new Error('Emporium Adapter find not configured');
  };
  async get(schema, query) {
    throw new Error('Emporium Adapter get not configured');
  };
  async update(schema, body, query) {
    throw new Error('Emporium Adapter update not configured');
  };
};
