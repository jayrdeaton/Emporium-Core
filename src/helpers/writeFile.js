let { writeFile } = require('fs'),
  expandHomeDir = require('./expandHomeDir');

module.exports = (dir, data, pretty) => {
  return new Promise((resolve, reject) => {
    dir = expandHomeDir(dir);
    let space = 0;
    if (pretty) space = 2;
    writeFile(dir, JSON.stringify(data, null, space), (err) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};
