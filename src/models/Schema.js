module.exports = class Schema {
  constructor(data) {
    this.attributes = data;
    this.hidden = [];
    this.locked = [];
    this.required = [];
    this.name = null;
    this.resourceName = null;
    this.strict = true;
    this.identifier = null;
    this.adapter = null;
    for (let key of Object.keys(data)) {
      let value = data[key]
      if (typeof value === 'object') {
        if (!value.type) throw new Error(`Schema attribute '${key}' requires a type`);
        if (value.hidden) this.hidden.push(key);
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
