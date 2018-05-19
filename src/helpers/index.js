let arrayQuery = require('./arrayQuery'),
  checkDirectory = require('./checkDirectory'),
  expandHomeDir = require('./expandHomeDir'),
  readFile = require('./readFile'),
  removeArrayEntry = require('./removeArrayEntry'),
  updateArrayEntry = require('./updateArrayEntry'),
  wholeObject = require('./wholeObject'),
  writeFile = require('./writeFile');

module.exports = { arrayQuery, checkDirectory, expandHomeDir, removeArrayEntry,
  updateArrayEntry, readFile, wholeObject, writeFile };
