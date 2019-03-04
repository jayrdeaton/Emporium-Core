let { existsSync, mkdirSync } = require('fs'),
  { join, sep } = require('path'),
  expandHomeDir = require('./expandHomeDir');

module.exports = (dir) => {
  dir = expandHomeDir(dir);
  if (existsSync(dir)) return;
  let array = dir.split(sep);
  if (array[0] === '') array.shift();
  let workingDir =sep;
  for (let item of array) {
    workingDir = join(workingDir, item);
    if (!existsSync(workingDir)) mkdirSync(workingDir);
  };
};
