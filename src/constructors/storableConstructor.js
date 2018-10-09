module.exports = (emporium, schema) => {
  let Storable = class Storable {
    constructor(data) {
      for (let attribute of Object.keys(schema.attributes)) {
        let definition = schema.attributes[attribute];
        if (typeof definition === 'object') {
          if (definition.default !== undefined) this[attribute] = definition.default
          if (typeof definition.default === 'function') this[attribute] = definition.default();
          if (data && data[attribute] !== undefined && data[attribute] !== null) {
            if (definition.type === Array) {
              this[attribute] = definition.type(...data[attribute]);
            } else {
              this[attribute] = definition.type(data[attribute]);
            };
          };
          if (definition.required && !this[attribute]) throw `${schema.name} missing required value: ${attribute}!`;
        } else {
          if (data && data[attribute] !== undefined && data[attribute] !== null) {
            if (definition === Array) {
              this[attribute] = definition(...data[attribute]);
            } else {
              this[attribute] = definition(data[attribute]);
            };
          };
        };
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
    static async create(body) {
      body = this.convertObjects(body);
      let result = await schema.adapter.create(schema, body);
      if (!result) return result;
      return this.convertObjects(result);
    };
    static async update(body) {
      body = this.convertObjects(body);
      let result = await schema.adapter.update(schema, body);
      if (!result) return result;
      return this.convertObjects(result);
    };
    static async get(query) {
      let result = await schema.adapter.get(schema, query);
      return this.convertObjects(result);
    };
    static async find(identifier) {
      if (!schema.identifier) return null;
      if (typeof identifier === 'object') identifier = identifier[schema.identifier];
      if (!identifier) return null;
      let result = await schema.adapter.find(schema, identifier);
      if (!result) return result;
      return this.convertObjects(result);
    };
    static delete(body) {
      return schema.adapter.delete(schema, body);
    };
    async save() {
      let object = await schema.adapter.update(schema, this);
      return new this.constructor(object);
    };
    delete() {
      return schema.adapter.delete(schema, this);
    }
  };

  return Storable;
};
