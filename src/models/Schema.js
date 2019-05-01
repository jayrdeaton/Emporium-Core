module.exports = class Schema {
  constructor(attributes, options) {
    // options
    if (!options) options = {};
    const { adapter, discarded, hidden, identifier, locked, name, required, resourceName, strict } = options;
    this.adapter = adapter || null;
    this.discarded = discarded || [];
    this.hidden = hidden || [];
    this.identifier = identifier || null;
    this.locked = locked || [];
    this.name = name || null;
    this.required = required || [];
    this.resourceName = resourceName || null;
    this.strict = strict || true;
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
