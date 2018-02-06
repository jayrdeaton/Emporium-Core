let Attribute = require('./attribute');

module.exports = class Schema {
  constructor(name, data) {
    this.attributes = [];
    this.hidden = [];
    this.locked = [];
    this.name = name;
    for (let key of Object.keys(data)) {
      let name, type, defaultValue, required;
      let value = data[key]
      name = key;
      if (typeof value === 'object') {
        type = value.type;
        if (value.default) defaultValue = value.default;
        if (value.required) required = true;
        if (value.hidden) this.hidden.push(key)
        if (value.readOnly ||value.locked) this.locked.push(key);
      } else {
        type = value;
      };
      this.attributes.push(new Attribute({name, type, default: defaultValue, required}));
    };
  };
  hide(array) {
    if (array) this.hidden = this.hidden.concat(array);
  };
  lock(array) {
    if (array) this.locked = this.locked.concat(array);
  };
};
