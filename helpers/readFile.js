let fs = require('fs');

module.exports = (dir) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dir)) {
      fs.readFile(dir, (err, data) => {
        if (err) reject(err);
        let result = JSON.parse(data);
        resolve(result);
      });
    } else {
      resolve([]);
    };
  });
};
