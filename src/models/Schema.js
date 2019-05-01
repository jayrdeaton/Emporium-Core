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
  setAdapter(adapter) {
    this.adapter = adapter;
  };
  setIdentifier(identifier) {
    this.identifier = identifier;
  };
  setResourceName(resourceName) {
    this.resourceName = resourceName;
  };
  setStrict(strict) {
    this.strict = strict;
  };
  discard(value) {
    if (Array.isArray(value)) {
      this.discarded.concat(value);
    } else if (typeof value === 'string') {
      this.discarded.push(value);
    } else {
      throw new Error(`Unexpected input ${value}`);
    };
    return this;
  };
  hide(value) {
    if (Array.isArray(value)) {
      this.hidden.concat(value);
    } else if (typeof value === 'string') {
      this.hidden.push(value);
    } else {
      throw new Error(`Unexpected input ${value}`);
    };
    return this;
  };
  lock(value) {
    if (Array.isArray(value)) {
      this.locked.concat(value);
    } else if (typeof value === 'string') {
      this.locked.push(value);
    } else {
      throw new Error(`Unexpected input ${value}`);
    };
    return this;
  };
  require(value) {
    if (Array.isArray(value)) {
      this.required.concat(value);
    } else if (typeof value === 'string') {
      this.required.push(value);
    } else {
      throw new Error(`Unexpected input ${value}`);
    };
    return this;
  };
};
