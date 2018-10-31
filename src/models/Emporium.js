let { storableConstructor } = require('../constructors'),
  Schema = require('./Schema'),
  { APIAdapter, MemoryAdapter } = require('../adapters');

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
Emporium.APIAdapter = APIAdapter;
Emporium.MemoryAdapter = MemoryAdapter;

module.exports = Emporium;
