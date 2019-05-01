const { getValueWithType } = require('../helpers');

module.exports = (emporium, schema) => {
  const Viewable = class Viewable {
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
      if (data && !schema.strict) for (const key of Object.keys(data)) if (!Object.keys(schema.attributes).includes(key)) this[key] = data[key];
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
    static get schema() {
      return schema;
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
    static async find(identifier, query) {
      if (!schema.identifier) return null;
      if (typeof identifier === 'object') identifier = identifier[schema.identifier];
      if (!identifier) return null;
      let result = await schema.adapter.find(schema, identifier, query);
      return result ? this.convertObjects(result) : null;
    };
    static async get(query) {
      let result = await schema.adapter.get(schema, query);
      return result ? this.convertObjects(result) : [];
    };
  };
  return Viewable;
};
