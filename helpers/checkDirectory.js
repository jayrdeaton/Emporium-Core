let fs = require('fs');

module.exports = (dir) => {
  let array = dir.split('/');
  let workingDir = array[0];
  array.shift();
  for (let item of array) {
    workingDir += `/${item}`;
    if (!fs.existsSync(workingDir)) fs.mkdirSync(workingDir);
  };
};
