let modelConstructor = require('./modelConstructor'),
  Schema = require('./schema'),
  { join } = require('path'),
  { homedir } = require('os'),
  checkDirectory = require('../helpers').checkDirectory;

module.exports = class Emporium {
  constructor(name) {
    this.data = {};
    if (!name) name = 'Emporium';
    this.config = { directory: join(homedir(), '.emporium'), name, pretty: false };
    this.models = {};
    this.Schema = Schema;
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
