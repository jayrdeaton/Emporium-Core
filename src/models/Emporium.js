const { storableConstructor } = require('../constructors'),
  Schema = require('./Schema');

module.exports = class Emporium {
  constructor(adapter, data) {
    // adaper
    this.adapter = adapter;
    // models object
    this.models = {};
    if (!data) data = {};
    const { identifier, afterDefine, beforeDefine, afterStorage, beforeStorage } = data;
    // emporium options apply to all storables defined
    this.identifier = identifier || 'id';
    // hooks
    this.afterDefine = afterDefine || null;
    this.beforeDefine = beforeDefine || null;
    this.afterStorage = afterStorage || null;
    this.beforeStorage = beforeStorage || null;
  };
  define(name, attributes, options) {
    if (this.beforeDefine) this.beforeDefine(attributes, options);
    const schema = new Schema(attributes, options);
    schema.name = name;
    if (this.adapter && !schema.adapter) schema.adapter = this.adapter;
    if (this.identifier && !schema.identifier) schema.identifier = this.identifier;
    if (this.afterStorage && !schema.afterStorage) schema.afterStorage = this.afterStorage;
    if (this.beforeStorage && !schema.beforeStorage) schema.beforeStorage = this.beforeStorage;
    const Storable = storableConstructor(this, schema);
    if (this.afterDefine) this.afterDefine(attributes, options);
    this.models[schema.name] = Storable;
    return Storable;
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
