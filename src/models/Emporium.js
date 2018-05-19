let { storableConstructor } = require('../constructors');
let Schema = require('./Schema');
let { APIAdapter, JSONAdapter } = require('../adapters');

let Emporium = class Emporium {
  constructor(name) {
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
Emporium.JSONAdapter = JSONAdapter;

module.exports = Emporium;
