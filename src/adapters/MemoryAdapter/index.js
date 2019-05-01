const { arrayQuery, removeArrayEntry, updateArrayEntry } = require('../../helpers');

module.exports = class MemoryAdapter {
  constructor(data) {
    this.database = {};
  };
  async create(schema, body) {
    let endpoint = schema.resourceName || schema.name;
    let objects = await this.get(schema, null);
    if (Array.isArray(body)) {
      objects.push(...body);
    } else {
      objects.push(body);
    };
    this.database[endpoint] = objects;
    return body;
  };
  async delete(schema, body) {
    if (!schema.identifier) return null;
    let endpoint = schema.resourceName || schema.name;
    let objects = await this.get(schema, null);
    if (Array.isArray(body)) {
      for (let entry of body) objects = removeArrayEntry(objects, entry, schema.identifier);
    } else {
      objects = removeArrayEntry(objects, body, schema.identifier);
    };
    this.database[endpoint] = objects;
    return null;
  };
  async find(schema, identifier) {
    if (!schema.identifier) return null;
    let endpoint = schema.resourceName || schema.name;
    let query = {filter: {[schema.identifier]: identifier}};
    let objects = await this.get(schema, query);
    let result;
    if (objects.length > 0) result = objects[0];
    return result;
  };
  async get(schema, query) {
    let endpoint = schema.resourceName || schema.name;
    let objects = [];
    if (this.database[endpoint]) Object.assign(objects, this.database[endpoint]);
    objects = arrayQuery(objects, query);
    return objects;
  };
  async update(schema, body) {
    if (!schema.identifier) return null;
    let endpoint = schema.resourceName || schema.name;
    let objects = await this.get(schema, null);
    if (Array.isArray(body)) {
      for (let entry of body) objects = updateArrayEntry(objects, entry, schema.identifier);
    } else {
      objects = updateArrayEntry(objects, body, schema.identifier);
    };
    this.database[endpoint] = objects;
    return body;
  };
};
