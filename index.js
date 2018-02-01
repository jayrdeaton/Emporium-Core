let fs = require('fs'),
  os = require('os'),
  homedir = os.homedir();

let data = {};

let config = { name: 'Emporium', pretty: true };

let models = {};

let open = (name) => {
  if (name) {
    config.name = name;
  };
  if (!fs.existsSync(`${homedir}/.emporium`)) fs.mkdirSync(`${homedir}/.emporium`);
  if (!fs.existsSync(`${homedir}/.emporium/${config.name}`)) fs.mkdirSync(`${homedir}/.emporium/${config.name}`);
};

let schemas = {};

module.exports = { config, data, models, open, schemas };
