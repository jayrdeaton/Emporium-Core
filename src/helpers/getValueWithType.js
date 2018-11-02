module.exports = (value, type) => {
  let result;
  if (type === Array || type.prototype instanceof Array) {
    try {
      result = new type(...value);
    } catch(err) {
      throw new Error(`Unable to construct ${typeof value} '${JSON.stringify(value)}' as an Array`);
    };
  } else if (type === Boolean) {
    try {
      result = type(value);
    } catch(err) {
      throw new Error(`Unable to construct ${typeof value} '${JSON.stringify(value)}' as a Boolean`);
    };
  } else if (type === Date) {
    try {
      result = new type(value);
    } catch(err) {
      throw new Error(`Unable to construct ${typeof value} '${JSON.stringify(value)}' as a Date`);
    };
  } else if (type === Number) {
    try {
      result = type(value);
    } catch(err) {
      throw new Error(`Unable to construct ${typeof value} '${JSON.stringify(value)}' as a Number`);
    };
  } else if (type === Object) {
    try {
      result = new type(value);
    } catch(err) {
      throw new Error(`Unable to construct ${typeof value} '${JSON.stringify(value)}' as an Object`);
    };
  } else if (type === String) {
    try {
      result = type(value);
    } catch(err) {
      throw new Error(`Unable to construct ${typeof value} '${JSON.stringify(value)}' as a String`);
    };
  } else {
    try {
      result = new type(value);
    } catch(err) {
      throw new Error(`Unable to construct ${typeof value} '${JSON.stringify(value)}' with ${type}`);
    };
  };
  return result;
};
