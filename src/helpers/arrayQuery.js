let filter = (array, data) => {
  if (!data) return array;
  let result;
  for (let key of Object.keys(data)) {
    if (typeof data[key] === 'object' && data[key] !== null) {
      if (Object.keys(data[key]).length == 0) {
        // RegExp
        result = array.filter(object => data[key].test(object[key]));
      } else {
        // Arrays and Objects
        result = array.filter((object) => {
          if (!object[key]) return false;
          for (let k in data[key]) {
            if (data[key][k] !== object[key][k]) return false;
          };
          return true;
        });
      };
    } else {
      result = array.filter(object => object[key] === data[key]);
    };
  };
  return result;
};
let limit = (array, data) => {
  if (!data) return array;
  return array.splice(0, data);;
};
let skip = (array, data) => {
  if (!data) return array;
  array.splice(0, data);
  return array;
};
let sort = (array, data) => {
  if (!data) return array;
  for (let key of Object.keys(data).reverse()) {
    if (data[key] < 0 ) {
      array.sort((a, b) => {
        if (String(a[key]).toLowerCase() < String(b[key]).toLowerCase()) return 1;
        if (String(a[key]).toLowerCase() > String(b[key]).toLowerCase()) return -1;
        return 0;
      });
    } else {
      array.sort((a, b) => {
        if (String(a[key]).toLowerCase() > String(b[key]).toLowerCase()) return 1;
        if (String(a[key]).toLowerCase() < String(b[key]).toLowerCase()) return -1;
        return 0;
      });
    };
  };
  return array;
};

module.exports = (array, query) => {
  if (!query) return array;
  if (query.filter) array = filter(array, query.filter);
  if (query.sort) array = sort(array, query.sort);
  if (query.skip) array = skip(array, query.skip);
  if (query.offset) array = skip(array, query.offset);
  if (query.limit) array = limit(array, query.limit);
  return array;
};
