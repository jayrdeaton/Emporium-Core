const { storableConstructor } = require('../constructors'),
  Schema = require('./Schema');

module.exports = class Emporium {
  constructor(data) {
    // models object
    this.models = {};
    if (!data) data = {};
    const { adapter, identifier, afterDefine, beforeDefine } = data;
    // emporium options apply to all storables defined
    this.adapter = adapter || null;
    this.identifier = identifier || 'id';
    // hooks
    this.afterDefine = afterDefine || null;
    this.beforeDefine = beforeDefine || null;
  };
  define(name, attributes, options) {
    if (this.beforeDefine) this.beforeDefine(attributes, options);
    const schema = new Schema(attributes);
    schema.name = name;
    if (this.adapter && !schema.adapter) schema.adapter = this.adapter;
    if (this.identifier && !schema.identifier) schema.identifier = this.identifier;
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
