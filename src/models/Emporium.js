let { storableConstructor } = require('../constructors');
let Schema = require('./Schema');
let adapters = require('../adapters');

let Emporium = class Emporium {
  constructor(name) {
  };
  storable(name, schema) {
    schema.name = name;
    let Storable = storableConstructor(this, schema);
    this[schema.name] = Storable;
    this[`${schema.name}_Schema`] = schema;
    return Storable;
  };
};

Emporium.Schema = Schema;
Emporium.adapters = adapters;

module.exports = Emporium;
