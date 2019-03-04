let { join } = require('path'),
  { checkDirectory, readFile, writeFile } = require('./json_helpers'),
  { arrayQuery, removeArrayEntry, updateArrayEntry } = require('../../helpers');

module.exports = class JSONAdapter {
  constructor(data) {
    this.name = 'Emporium';
    this.path = '~/.emporium';
    this.pretty = false;

    if (!data) return;

    if (data.name) this.name = data.name;
    if (data.path) this.path = data.path;
    if (data.pretty) this.pretty = data.pretty;
  };
  async create(schema, body) {
    let endpoint = schema.resourceName || schema.name;
    let dir = join(this.path, this.name);
    checkDirectory(dir);
    let objects = await this.get(schema, null);
    if (Array.isArray(body)) {
      objects.push(...body);
    } else {
      objects.push(body);
    };
    await writeFile(join(dir, `${endpoint}.json`), objects, this.pretty);
    return body;
  };
  async update(schema, body) {
    if (!schema.identifier) return null;
    let endpoint = schema.resourceName || schema.name;
    let dir = join(this.path, this.name);
    checkDirectory(dir);
    let objects = await this.get(schema, null);
    if (Array.isArray(body)) {
      for (let entry of body) objects = updateArrayEntry(objects, entry, schema.identifier);
    } else {
      objects = updateArrayEntry(objects, body, schema.identifier);
    };
    await writeFile(join(dir, `${endpoint}.json`), objects, this.pretty);
    return body;
  };
  async get(schema, query) {
    let endpoint = schema.resourceName || schema.name;
    let objects = await readFile(join(this.path, this.name, `${endpoint}.json`));
    objects = arrayQuery(objects, query);
    return objects;
  };
  async find(schema, identifier) {
    if (!schema.identifier) return null;
    let endpoint = schema.resourceName || schema.name;
    let objects = await readFile(join(this.path, this.name, `${endpoint}.json`));
    let query = {filter: {[schema.identifier]: identifier}};
    objects = arrayQuery(objects, query);
    return objects[0];
  };
  async delete(schema, body) {
    if (!schema.identifier) return null;
    let endpoint = schema.resourceName || schema.name;
    let dir = join(this.path, this.name);
    let objects = await this.get(schema, null);
    if (Array.isArray(body)) {
      for (let entry of body) objects = removeArrayEntry(objects, entry, schema.identifier);
    } else {
      objects = removeArrayEntry(objects, body, schema.identifier);
    };
    await writeFile(join(dir, `${endpoint}.json`), objects, this.pretty);
    return null;
  };
  setName(name) {
    this.name = name;
  };
};
