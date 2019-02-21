let { getValueWithType } = require('../helpers');

module.exports = (emporium, schema) => {
  let Storable = class Storable {
    constructor(data) {
      for (let attribute of Object.keys(schema.attributes)) {
        let definition = schema.attributes[attribute];
        let type;
        if (typeof definition === 'object') {
          type = definition.type;
          if (definition.default !== undefined) if (typeof definition.default === 'function') { this[attribute] = definition.default() } else { this[attribute] = definition.default };
        } else {
          type = definition;
        };
        if (data && typeof data[attribute] !== 'undefined') this[attribute] = data[attribute];
        if (typeof this[attribute] !== 'undefined' && this[attribute] !== null) this[attribute] = getValueWithType(this[attribute], type);
      };
      for (let hide of schema.hidden) {
        Object.defineProperty(this, hide, {
          enumerable: false
        });
      };
      for (let lock of schema.locked) {
        Object.defineProperty(this, lock, {
          writable: false
        });
      };
    };
    static convertObjects(data) {
      let result;
      if (Array.isArray(data)) {
        result = [];
        for (let entry of data) result.push(new this(entry));
      } else {
        result = new this(data);
      };
      return result;
    };
    static removeLockedAttributes(data) {
      if (Array.isArray(data)) {
        for (let entry of data) for (let lock of schema.locked) delete entry[lock];
      } else {
        for (let lock of schema.locked) delete data[lock];
      };
      return data;
    };
    static async batch(body, query) {
      let result = await schema.adapter.batch(schema, body, query);
      return this.convertObjects(result);
    };
    static async count(query) {
      let result = await schema.adapter.count(schema, query);
      return result;
    };
    static async create(body, query) {
      body = this.convertObjects(body);
      for (let key of schema.required) if (typeof body[key] === 'undefined' || body[key] === null) throw new Error(`${schema.name} missing required value: ${key}!`);
      let result = await schema.adapter.create(schema, body, query);
      if (!result) return result;
      return this.convertObjects(result);
    };
    static delete(body) {
      return schema.adapter.delete(schema, body);
    };
    static async duplicate(identifier, query) {
      if (!schema.identifier) return null;
      if (typeof identifier === 'object') identifier = identifier[schema.identifier];
      if (!identifier) return null;
      let result = await schema.adapter.duplicate(schema, identifier, query);
      if (!result) return result;
      return this.convertObjects(result);
    };
    static async find(identifier, query) {
      if (!schema.identifier) return null;
      if (typeof identifier === 'object') identifier = identifier[schema.identifier];
      if (!identifier) return null;
      let result = await schema.adapter.find(schema, identifier, query);
      if (!result) return result;
      return this.convertObjects(result);
    };
    static async get(query) {
      let result = await schema.adapter.get(schema, query);
      return this.convertObjects(result);
    };
    static async update(body, query) {
      body = this.convertObjects(body);
      body = this.removeLockedAttributes(body);
      for (let key of schema.required) if (typeof body[key] === 'undefined' || body[key] === null) throw new Error(`${schema.name} missing required value: ${key}!`);
      let result = await schema.adapter.update(schema, body, query);
      if (!result) return result;
      return this.convertObjects(result);
    };
    async save(query) {
      for (let key of schema.required) if (typeof this[key] === 'undefined' || this[key] === null) throw new Error(`${schema.name} missing required value: ${key}!`);
      let object = await schema.adapter.update(schema, this, query);
      return new this.constructor(object);
    };
    delete() {
      return schema.adapter.delete(schema, this);
    };
  };
  return Storable;
};
