let arrayQuery = require('./arrayQuery'),
  checkDirectory = require('./checkDirectory'),
  expandHomeDir = require('./expandHomeDir'),
  readFile = require('./readFile'),
  removeArrayEntry = require('./removeArrayEntry'),
  updateArrayEntry = require('./updateArrayEntry'),
  writeFile = require('./writeFile');

module.exports = { arrayQuery, checkDirectory, expandHomeDir, removeArrayEntry,
  updateArrayEntry, readFile, writeFile };
