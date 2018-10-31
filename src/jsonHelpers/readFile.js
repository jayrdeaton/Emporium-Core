let { existsSync, readFile } = require('fs'),
  { promisify } = require('util'),
  expandHomeDir = require('./expandHomeDir');

readFile = promisify(readFile);

module.exports = async (dir) => {
  dir = expandHomeDir(dir);
  if (existsSync(dir)) {
    let data = await readFile(dir);
    return JSON.parse(data);
  } else {
    return [];
  };
};
