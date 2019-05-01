const { viewableConstructor, storableConstructor } = require('../constructors'),
  Schema = require('./Schema');

module.exports = class Emporium {
  constructor(data) {
    if (!data) data = {};
    // emporium wide adapter
    this.adapter = data.adapter || null;
    // emporium wide identifying key
    this.identifier = data.identifier || null;
    // models object
    this.models = {};
  };
  get _adapter() { return this.adapter };
  get _identifier() { return this.identifier };
  setAdapter(adapter) {
    this.adapter = adapter;
  };
  setIdentifier(identifier) {
    this.identifier = identifier;
  };
  define(name, attributes, options) {
    const schema = new Schema(attributes);
    schema.name = name;
    if (this.adapter && !schema.adapter) schema.adapter = this._adapter;
    if (this.identifier && !schema.identifier) schema.identifier = this._identifier;
    const Storable = storableConstructor(this, schema);
    this.models[schema.name] = Storable;
    return Storable;
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
  viewable(name, schema) {
    schema.name = name;
    if (this._adapter && !schema.adapter) schema.adapter = this._adapter;
    if (this._identifier && !schema.identifier) schema.identifier = this._identifier;
    let Viewable = viewableConstructor(this, schema);
    this[schema.name] = Viewable;
    this[`${schema.name}_Schema`] = schema;
    return Viewable;
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
