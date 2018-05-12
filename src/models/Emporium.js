let { storableConstructor } = require('../constructors');
let Schema = require('./Schema');
let adapters = require('../adapters');

let Emporium = class Emporium {
  constructor(name) {
    this.data = {};
    this.models = {};
    this.schemas = {};
  };
  storable(name, schema) {
    schema.name = name;
    let Model = storableConstructor(this, schema);
    this.models[schema.name] = Model;
    this.schemas[schema.name] = schema;
    return Model;
  };
};

Emporium.Schema = Schema;
Emporium.adapters = adapters;

module.exports = Emporium;
