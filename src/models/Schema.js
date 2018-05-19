module.exports = class Schema {
  constructor(data) {
    this.attributes = data;
    this.hidden = [];
    this.locked = [];
    this.name = null;
    this.resourceName = null;
    this.identifier = null;
    this.adapter = null;
    for (let key of Object.keys(data)) {
      let value = data[key]
      if (typeof value === 'object') {
        if (value.hidden) this.hidden.push(key)
        if (value.readOnly || value.locked) this.locked.push(key);
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
  hide(array) {
    if (array) this.hidden = this.hidden.concat(array);
    return this;
  };
  lock(array) {
    if (array) this.locked = this.locked.concat(array);
    return this;
  };
};
