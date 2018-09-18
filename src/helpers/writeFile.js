let { writeFile } = require('fs'),
  { promisify } = require('util'),
  expandHomeDir = require('./expandHomeDir');

writeFile = promisify(writeFile);

module.exports = (dir, data, pretty) => {
  dir = expandHomeDir(dir);
  let space = 0;
  if (pretty) space = 2;
  await writeFile(dir, JSON.stringify(data, null, space));
  return data;
};
