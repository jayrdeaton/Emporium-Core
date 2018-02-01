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
  constructor(schemaName, data) {
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
      // console.log(this.attributes)
    };
    emporium.schemas[schemaName] = this;
    emporium.models[schemaName] = class {
      constructor(data) {
        this._id = uuid();
        if (data && data._id) this._id = data._id;
        let schema = emporium.schemas[schemaName];
        for (let attribute of schema.attributes) {
          if (attribute.default) this[attribute.name] = attribute.default
          if (data && data[attribute.name]) this[attribute.name] = attribute.type(data[attribute.name]);
          if (attribute.required && !this[attribute.name]) throw `${schemaName} missing required value: ${attribute.name}!`;
        };
      };
      static init(data) {
        let object = constructor(data);
        return object;
      };
      static schemaName() {
        return schemaName;
      };
      // includeHidden() {
      //   Object.defineProperty(this, '_id', {
      //     enumerable: true,
      //     writeable: true
      //   });
      // };
      // excludeHidden() {
      //   Object.defineProperty(this, '_id', {
      //     enumerable: false,
      //     writeable: true
      //   });
      // };
      static async open() {
        let result;
        if (fs.existsSync(`${homedir}/.emporium/${emporium.config.name}/${schemaName}.json`)) {
          result = await readFile(`${homedir}/.emporium/${emporium.config.name}/${schemaName}.json`);
        } else {
          result = await writeFile(`${homedir}/.emporium/${emporium.config.name}/${schemaName}.json`, [], emporium.config.pretty);
        };
        emporium.data[schemaName] = result;
        return result;
      };
      static async fetch(query) {
        if (!query) query = {};
        let Model = emporium.models[schemaName]
        let result = [];
        let objects = emporium.data[schemaName]
        if (!objects) objects = await this.open();
        for (let object of objects) {
          let match = true;
          for (let key of Object.keys(query)) {
            if (object[key] !== query[key]) {
              match = false;
            };
          };
          if (match) {
            result.push(new Model(object));
          };
        };
        return result;
      };
      static async fetchOne(query) {
        if (!query) query = {};
        let Model = emporium.models[schemaName]
        let objects = emporium.data[schemaName]
        if (!objects) objects = await this.open();
        if (objects.length == 0) return null;
        for (let object of objects) {
          let match = true;
          for (let key of Object.keys(query)) {
            if (object[key] !== query[key]) {
              match = false;
            };
          };
          if (match) {
            return new Model(object);
          };
        };
      };
      static async remove (query) {
        if (!query) return null;
        let objects = emporium.data[schemaName]
        if (!objects) objects = await this.open();
        if (objects.length == 0) return null;
        let results = [];
        for (let [index, object] of objects.entries()) {
          let match = true;
          for (let key of Object.keys(query)) {
            if (object[key] !== query[key]) {
              match = false;
            };
          };
          if (match) {
            results.push(index);
          };
        };
        results.reverse();
        for (let result of results) {
          objects.splice(result, 1);
        };
        emporium.data[schemaName] = objects;
        if (results.length > 0) await this.saveData(objects);
      };
      static async saveData(data) {
        await writeFile(`${homedir}/.emporium/${emporium.config.name}/${schemaName}.json`, data, emporium.config.pretty);
      };
      async fetchStored(query) {
        if (!query) query = {};
        let Model = emporium.models[schemaName]
        let objects = emporium.data[schemaName]
        if (!objects) objects = await this.open();
        if (objects.length == 0) return null;
        for (let object of objects) {
          let match = true;
          for (let key of Object.keys(query)) {
            if (object[key] !== query[key]) {
              match = false;
            };
          };
          if (match) {
            return object;
          };
        };
      };
      async save() {
        let existing = await this.fetchStored({_id: this._id});
        if (existing) {
          Object.assign(existing, this);
        } else {
          emporium.data[schemaName].push(this);
        };
        await writeFile(`${homedir}/.emporium/${emporium.config.name}/${schemaName}.json`, emporium.data[schemaName], emporium.config.pretty);
      };
    };
  };
};
