let { existsSync, readFile } = require('fs'),
  expandHomeDir = require('./expandHomeDir');

module.exports = async (dir) => {
  return new Promise((resolve, reject) => {
    dir = expandHomeDir(dir);
    if (existsSync(dir)) {
      readFile(dir, (err, data) => {
        if (err) reject(err);
        let result = JSON.parse(data);
        resolve(result);
      });
    } else {
      resolve([]);
    };
  });
};
