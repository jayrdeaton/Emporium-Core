let modelConstructor = require('./modelConstructor'),
  Schema = require('./schema'),
  fs = require('fs'),
  os = require('os'),
  homedir = os.homedir(),
  checkDirectory = require('../helpers').checkDirectory;

module.exports = class Emporium {
  constructor(name) {
    this.data = {};
    if (!name) name = 'Emporium';
    this.config = { directory: `${homedir}/.emporium`, name, pretty: false };
    this.models = {};
    this.Schema = Schema;
    if (!fs.existsSync(`${homedir}/.emporium`)) fs.mkdirSync(`${homedir}/.emporium`);
    if (!fs.existsSync(`${homedir}/.emporium/${this.config.name}`)) fs.mkdirSync(`${homedir}/.emporium/${this.config.name}`);
  };
  add(schema) {
    let Model = modelConstructor(this, schema);
    this.models[schema.name] = Model;
  };
  pretty() {
    this.config.pretty = true;
  };
  set path(dir) {
    if (dir.includes('~')) dir = dir.replace('~', homedir);
    checkDirectory(dir);
    this.config.directory = dir;
  };
};
