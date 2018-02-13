let uuid = require('uuid').v1,
  { join } = require('path');
  Collection = require('./collection'),
  Fetch = require('./fetch'),
  { checkDirectory, readFile, writeFile } = require('../helpers');

module.exports = (emporium, schema) => {
  return class Model {
    constructor(data) {
      // emporium = emporium;
      // Object.defineProperty(this, '_emporium', {
      //   enumerable: false,
      //   writable: true
      // });
      // schema = schema;
      // Object.defineProperty(this, '_schema', {
      //   enumerable: false,
      //   writable: true
      // });
      this._id = uuid();
      if (!data) return this;
      if (data._id) this._id = data._id;
      for (let attribute of schema.attributes) {
        if (attribute.default) this[attribute.name] = attribute.default
        if (data && data[attribute.name]) this[attribute.name] = attribute.type(data[attribute.name]);
        if (schema.hidden)
        if (attribute.required && !this[attribute.name]) throw `${schema.name} missing required value: ${attribute.name}!`;
      };
      for (let hide of schema.hidden) {
        Object.defineProperty(this, hide, {
          enumerable: false
        });
      };
      for (let lock of schema.locked) {
        Object.defineProperty(this, lock, {
          writable: false
        });
      };
    };
    // static init(data) {
    //   let object = constructor(data);
    //   return object;
    // };
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
      if (emporium.data[schema.name]) return emporium.data[schema.name];
      result = await readFile(join(emporium.config.directory, emporium.config.name, `${schema.name}.json`));
      emporium.data[schema.name] = result;
      return result;
    };
    static fetch(filter, sort, limit, skip) {
      return new Fetch((resolve, reject) => {
        this.open().then((data) => {
          resolve(new Collection(...data));
        }).catch((err) => {
          reject(err);
        });
      }, this, filter, sort, limit, skip);
    };
    static async find(query) {
      return this.fetch(query);
    };
    static async fetchOne(query) {
      let results = await this.fetch(query, null, 1);
      return results[0];
    };
    static async findOne(query) {
      return this.fetchOne(query);
    };
    static async remove (query) {
      if (!query) return null;
      let objects = emporium.data[schema.name];
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
      emporium.data[schema.name] = objects;
      if (results.length > 0) await this.saveData(objects);
      return true;
    };
    static async saveData(data) {
      checkDirectory(join(emporium.config.directory, emporium.config.name));
      await writeFile(join(emporium.config.directory, emporium.config.name, `${schema.name}.json`), data, emporium.config.pretty);
    };
    static async fetchStored(query) {
      let objects = emporium.data[schema.name];
      if (!objects) objects = await this.open();
      if (!query) return objects;
      let result;
      for (let key of Object.keys(query)) result = objects.filter(object => object[key] == query[key]);
      return result;
    };
    static async fetchOneStored(query) {
      let result = await this.fetchStored(query)
      return result[0];
    };
    async save() {
      let existing = await emporium.models[schema.name].fetchOneStored({_id: this._id});
      if (existing) {
        for (let key of Object.getOwnPropertyNames(this)) if (existing[key] !== this[key]) existing[key] = this[key];
      } else {
        let object = {};
        for (let key of Object.getOwnPropertyNames(this)) object[key] = this[key];
        emporium.data[schema.name].push(object);
      };
      checkDirectory(join(emporium.config.directory, emporium.config.name));
      await writeFile(join(emporium.config.directory, emporium.config.name, `${schema.name}.json`), emporium.data[schema.name], emporium.config.pretty);
    };
    async remove() {
      let Model = emporium.models[schema.name];
      return Model.remove({ _id: this._id });
    };
  };
};
