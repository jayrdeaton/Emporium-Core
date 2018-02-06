let uuid = require('uuid').v1,
  fs = require('fs'),
  os = require('os'),
  homedir = os.homedir(),
  helpers = require('../helpers'),
  readFile = helpers.readFile,
  writeFile = helpers.writeFile;

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
        if (attribute.required && !this[attribute.name]) throw `${schema.name} missing required value: ${attribute.name}!`;
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
      if (fs.existsSync(`${homedir}/.emporium/${emporium.config.name}/${schema.name}.json`)) {
        result = await readFile(`${homedir}/.emporium/${emporium.config.name}/${schema.name}.json`);
      } else {
        result = await writeFile(`${homedir}/.emporium/${emporium.config.name}/${schema.name}.json`, [], emporium.config.pretty);
      };
      emporium.data[schema.name] = result;
      return result;
    };
    static async fetch(query) {
      if (!query) query = {};
      let results = [];
      let limit;
      let skip;
      let sort;
      if (query._limit == 0) {
        return results;
      } else if (query._limit) {
        limit = query._limit;
        delete query._limit;
      };
      if (query._sort) {
        sort = query._sort;
        delete query._sort;
      }
      if (query._skip && query._skip > 0) {
        skip = query._skip;
        delete query._skip;
      };
      let Model = emporium.models[schema.name]
      let objects = emporium.data[schema.name]
      if (!objects) objects = await this.open();
      for (let object of objects) {
        let match = true;
        for (let key of Object.keys(query)) {
          if (object[key] !== query[key]) {
            match = false;
          };
        };
        if (match) {
          if (skip) {
            skip--;
            continue;
          };
          results.push(new Model(object));
          if (limit && results.length === limit) break;
        };
      };
      // if (results.length > 0 && sort) {
      //   let keys = Object.keys(sort);
      //   keys.reverse();
      //   for (let key of keys) {
      //     let sortedSet = [];
      //     for (let result of results) {
      //       for (let [index, sorted] of sortedSet.entries()) {
      //         if (result[key] > sorted[key]) {
      //           sortedSet.splice(index + 1, 0, result);
      //           continue;
      //         } else if (index === sortedSet - 1) {
      //           sortedSet.push(result);
      //         };
      //       };
      //       if (sortedSet.length === 0) sortedSet.push(result);
      //     };
      //     // results.sort((a, b) => {
      //     //   // let bool = sort[key] > 0 ? true : false;
      //     //   if (a[key] > b[key]) return 1;
      //     //   if (a[key] > b[key]) return -1;
      //     //   return 0;
      //     // });
      //   };
      // };
      return results;
    };
    static async fetchOne(query) {
      if (!query) query = {};
      let Model = emporium.models[schema.name]
      let objects = emporium.data[schema.name]
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
      let objects = emporium.data[schema.name]
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
    };
    static async saveData(data) {
      await writeFile(`${homedir}/.emporium/${emporium.config.name}/${schema.name}.json`, data, emporium.config.pretty);
    };
    static async limit(int, test) {
      console.log(this, test, int)
    };
    static async fetchStored(query) {
      if (!query) query = {};
      let objects = emporium.data[schema.name]
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
      return null;
    };
    async save() {
      console.log('save');
      let existing = await emporium.models[schema.name].fetchStored({_id: this._id});
      if (existing) {
        Object.assign(existing, this);
      } else {
        emporium.data[schema.name].push(this);
      };
      await writeFile(`${homedir}/.emporium/${emporium.config.name}/${schema.name}.json`, emporium.data[schema.name], emporium.config.pretty);
    };
  };
};
