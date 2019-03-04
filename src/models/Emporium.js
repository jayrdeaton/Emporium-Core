let { storableConstructor } = require('../constructors'),
  Schema = require('./Schema');

module.exports = class Emporium {
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
  static get Schema() {
    return Schema;
  };
  static get APIAdapter() {
    try {
      return require('../adapters/APIAdapter');
    } catch(err) {
      throw new Error(`Error loading Emporium APIAdapter: ${err}`);
    };
  };
  static get MemoryAdapter() {
    try {
      return require('../adapters/MemoryAdapter');
    } catch(err) {
      throw new Error(`Error loading Emporium MemoryAdapter: ${err}`);
    };
  };
};
