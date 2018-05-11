let { storableConstructor } = require('../constructors');

let Emporium = class Emporium {
  constructor(name) {
    this.data = {};
    this.models = {};
    this.schemas = {};
  };
  storable(name, schema) {
    schema.name = name;
    if (!schema.resourceName) schema.resourceName = name;
    let Model = storableConstructor(this, schema);
    this.models[schema.name] = Model;
    return Model;
  };
};

module.exports = Emporium;
