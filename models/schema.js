let emporium = require('../'),
  Attribute = require('./attribute'),
  fs = require('fs'),
  os = require('os'),
  homedir = os.homedir(),
  uuid = require('uuid').v1,
  helpers = require('../helpers'),
  readFile = helpers.readFile,
  writeFile = helpers.writeFile;

module.exports = class Schema {
  constructor(name, data) {
    this.name = name;
    this.attributes = [];
    for (let key of Object.keys(data)) {
      let name, type, defaultValue, required;
      let value = data[key]
      name = key;
      if (typeof value === 'object') {
        type = value.type;
        if (value.default) defaultValue = value.default;
        if (value.required) required = true;
      } else {
        type = value;
      };
      this.attributes.push(new Attribute({name, type, default: defaultValue, required}));
    };
  };
};
