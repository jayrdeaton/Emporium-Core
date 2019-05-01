const { viewableConstructor, storableConstructor } = require('../constructors'),
  Schema = require('./Schema');

module.exports = class Emporium {
  constructor(data) {
    if (!data) data = {};
    // emporium wide adapter
    this.adapter = data.adapter || null;
    // emporium wide identifying key
    this.identifier = data.identifier || 'id';
    // models object
    this.models = {};
  };
  define(name, attributes, options) {
    const schema = new Schema(attributes);
    schema.name = name;
    if (this.adapter && !schema.adapter) schema.adapter = this.adapter;
    if (this.identifier && !schema.identifier) schema.identifier = this.identifier;
    const Storable = storableConstructor(this, schema);
    this.models[schema.name] = Storable;
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
