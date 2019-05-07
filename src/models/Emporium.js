const { storableConstructor } = require('../constructors'),
  Adapter = require('./Adapter'),
  Schema = require('./Schema');

module.exports = class Emporium {
  constructor(adapter, options) {
    // adaper
    this.adapter = adapter || new Adapter();
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
    if (!attributes) attributes = {};
    if (!options) options = {};
    if (this.beforeDefine) this.beforeDefine(attributes, options);
    if (this.adapter && options.adapter === undefined) options.adapter = this.adapter;
    if (this.identifier && options.identifier === undefined) options.identifier = this.identifier;
    if (this.afterStorage && options.afterStorage === undefined) options.afterStorage = this.afterStorage;
    if (this.beforeStorage && options.beforeStorage === undefined) options.beforeStorage = this.beforeStorage;
    if (this.strict !== undefined && options.strict === undefined) options.strict = this.strict;
    const schema = new Schema(name, attributes, options);
    const Storable = storableConstructor(this, schema);
    if (this.afterDefine) this.afterDefine(Storable);
    this.models[schema.name] = Storable;
    return Storable;
  };
  static get Adapter() {
    return Adapter
  };
};
