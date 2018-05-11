let { homedir } = require('os'),
  { sep} = require('path');

module.exports = (dir) => {
  if (!dir.startsWith('~')) return dir;
  return dir.replace('~', homedir());
};
