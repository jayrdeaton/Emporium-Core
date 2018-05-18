module.exports = (data) => {
  let object = {};
  for (let key of Object.getOwnPropertyNames(data)) object[key] = data[key];
  return object;
};
