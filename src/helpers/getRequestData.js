let wholeObject = require('./wholeObject');

module.exports = (data) => {
  if (Array.isArray(data)) {
    body = [];
    for (let object of data) body.push(wholeObject(object));
  } else {
    body = wholeObject(data);
  };
  return JSON.stringify(body);
};
