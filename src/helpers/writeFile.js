let { writeFile } = require('fs'),
  expandHomeDir = require('./expandHomeDir');

module.exports = (dir, array, pretty) => {
  return new Promise((resolve, reject) => {
    dir = expandHomeDir(dir);
    let space = 0;
    if (pretty) space = 2;
    let data = [];
    for (let object of array) {
      let wholeObject = {};
      for (let key of Object.getOwnPropertyNames(object)) wholeObject[key] = object[key];
      data.push(wholeObject);
    }
    writeFile(dir, JSON.stringify(data, null, space), (err) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};
