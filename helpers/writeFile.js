let fs = require('fs');

module.exports = (dir, data, pretty) => {
  return new Promise((resolve, reject) => {
    let space = 0;
    if (pretty) space = 2;
    fs.writeFile(dir, JSON.stringify(data, null, space), (err) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};
