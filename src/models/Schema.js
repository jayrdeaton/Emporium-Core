const pluralize = require('pluralize');

module.exports = class Schema {
  constructor(name, attributes, options) {
    // name
    this.name = name;
    // options
    if (!options) options = {};
    const { adapter, afterStorage, beforeStorage, discarded, hidden, identifier, locked, readable, required, resourceName, strict, writable } = options;
    this.adapter = adapter;
    this.afterStorage = afterStorage;
    this.beforeStorage = beforeStorage;
    this.discarded = discarded || [];
    this.extends = options.extends;
    this.hidden = hidden || [];
    this.identifier = identifier;
    this.locked = locked || [];
    this.readable = readable === false ? false : true;
    this.required = required || [];
    this.resourceName = resourceName ? resourceName : pluralize(name).toLowerCase();
    this.strict = strict === false ? false : true;
    this.writable = writable === false ? false : true;
    // attributes
    if (!attributes) attributes = {};
    this.attributes = attributes;
    for (const key of Object.keys(attributes)) {
      const value = attributes[key]
      if (typeof value === 'object') {
        if (!value.type) throw new Error(`Schema attribute '${key}' requires a type`);
        if (value.hidden) this.hidden.push(key);
        if (value.discarded) this.discarded.push(key);
        if (value.readOnly || value.locked) this.locked.push(key);
        if (value.required) this.required.push(key);
      };
    };
  };
};
