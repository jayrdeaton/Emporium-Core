module.exports = (value, type) => {
  let result;
  if (type === Array || type.prototype instanceof Array) {
    result = new type(...value);
  } else if (type === Boolean) {
    result = type(value);
  } else if (type === Number) {
    result = type(value);
  } else if (type === String) {
    result = type(value);
  } else {
    result = new type(value);
  };
  return result;
};
