const { storableConstructor } = require('../constructors'),
  Schema = require('./Schema');

module.exports = class Emporium {
  constructor(adapter, options) {
    // adaper
    this.adapter = adapter;
    // models object
    this.models = {};
    if (!options) options = {};
    const { afterDefine, afterStorage, identifier, beforeDefine, beforeStorage, strict } = options;
    // emporium options apply to all storables defined
    this.identifier = identifier || 'id';
    // hooks
    this.afterDefine = afterDefine;
    this.afterStorage = afterStorage;
    this.beforeDefine = beforeDefine;
    this.beforeStorage = beforeStorage;
    this.strict = strict;
  };
  define(name, attributes, options) {
    if (!options) options = {};
    if (this.beforeDefine) this.beforeDefine(attributes, options);
    if (this.adapter && !options.adapter) options.adapter = this.adapter;
    if (this.identifier && !options.identifier) options.identifier = this.identifier;
    if (this.afterStorage && !options.afterStorage) options.afterStorage = this.afterStorage;
    if (this.beforeStorage && !options.beforeStorage) options.beforeStorage = this.beforeStorage;
    if (this.strict && !options.strict) options.strict = this.strict;
    const schema = new Schema(name, attributes, options);
    const Storable = storableConstructor(this, schema);
    if (this.afterDefine) this.afterDefine(Storable);
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
