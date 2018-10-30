let { storableConstructor } = require('../constructors');
let Schema = require('./Schema');

let Emporium = class Emporium {
  constructor() {
    this._adapter = null;
    this._identifier = null;
  };
  setAdapter(adapter) {
    this._adapter = adapter;
  };
  setIdentifier(identifier) {
    this._identifier = identifier;
  };
  storable(name, schema) {
    schema.name = name;
    if (this._adapter && !schema.adapter) schema.adapter = this._adapter;
    if (this._identifier && !schema.identifier) schema.identifier = this._identifier;
    let Storable = storableConstructor(this, schema);
    this[schema.name] = Storable;
    this[`${schema.name}_Schema`] = schema;
    return Storable;
  };
};

Emporium.Schema = Schema;

Object.defineProperty(Emporium, 'APIAdapter', {
  get: () => {
    return require('../adapters/APIAdapter');
  }
});
Object.defineProperty(Emporium, 'JSONAdapter', {
  get: () => {
    return require('../adapters/JSONAdapter');
  }
});
Object.defineProperty(Emporium, 'MemoryAdapter', {
  get: () => {
    return require('../adapters/MemoryAdapter');
  }
});

module.exports = Emporium;
