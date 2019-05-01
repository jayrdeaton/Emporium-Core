module.exports = class Schema {
  constructor(attributes, options) {
    // options
    if (!options) options = {};
    const { adapter, afterStorage, beforeStorage, discarded, hidden, identifier, locked, name, required, resourceName, strict } = options;
    this.adapter = adapter;
    this.afterStorage = afterStorage;
    this.beforeStorage = beforeStorage;
    this.discarded = discarded || [];
    this.hidden = hidden || [];
    this.identifier = identifier;
    this.locked = locked || [];
    this.name = name;
    this.required = required || [];
    this.resourceName = resourceName;
    this.strict = strict;
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
