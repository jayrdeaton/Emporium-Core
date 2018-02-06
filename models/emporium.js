let constructModel = require('./model'),
  Schema = require('./schema'),
  fs = require('fs'),
  os = require('os'),
  uuid = require('uuid').v1,
  homedir = os.homedir();

module.exports = class Emporium {
  constructor(name) {
    this.data = {};
    if (!name) name = 'Emporium';
    this.config = { name, pretty: true };
    this.models = {};
    this.Schema = Schema;
    if (!fs.existsSync(`${homedir}/.emporium`)) fs.mkdirSync(`${homedir}/.emporium`);
    if (!fs.existsSync(`${homedir}/.emporium/${this.config.name}`)) fs.mkdirSync(`${homedir}/.emporium/${this.config.name}`);
  };
  add(schema) {
    let Model = constructModel(this, schema);
    this.models[schema.name] = Model;
  };
};
