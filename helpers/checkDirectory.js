let { existsSync, mkdirSync } = require('fs'),
  { join, sep } = require('path');

module.exports = (dir) => {
  let array = dir.split(sep);
  array.shift();
  let workingDir = sep;
  for (let item of array) {
    workingDir = join(workingDir, item);
    if (!existsSync(workingDir)) mkdirSync(workingDir);
  };
};
