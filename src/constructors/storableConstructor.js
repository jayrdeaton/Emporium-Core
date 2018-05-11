module.exports = (emporium, schema) => {
  let Storable = class Storable {
    constructor(data) {
      for (let attribute of Object.keys(schema.attributes)) {
        let definition = schema.attributes[attribute];
        if (typeof definition === 'object') {
          if (definition.default !== undefined) this[attribute] = definition.default
          if (typeof definition.default === 'function') this[attribute] = definition.default();
          if (data && data[attribute]) {
            if (definition.type === Array) {
              this[attribute] = definition.type(...data[attribute]);
            } else {
              this[attribute] = definition.type(data[attribute]);
            };
          };
          if (definition.required && !this[attribute]) throw `${schema.name} missing required value: ${attribute}!`;
        } else {
          if (data && data[attribute]) {
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
    static async create(body) {
      body = new this(body);
      let object = await schema.adapter.create(schema, body);
      return new this(object);
    };
    static async update(body) {
      let result = await schema.adapter.update(schema, body);
      if (Array.isArray(result)) {
        let objects = [];
        for (let entry of result) objects.push(new this(entry));
        return objects;
      } else {
        return new this(result);
      };
    };
    static async get(query) {
      let response = [];
      let objects = await schema.adapter.get(schema, query);
      for (let object of objects) {
        response.push(new this(object));
      };
      return response;
    };
    static async find(identifier) {
      if (!schema.identifier) return null;
      if (typeof identifier === 'object') identifier = identifier[schema.identifier];
      let object = await schema.adapter.find(schema, identifier);
      return new this(object);
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
