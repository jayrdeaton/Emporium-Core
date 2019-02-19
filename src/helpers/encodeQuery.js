module.exports = (adapter, query) => {
  const result = {};
  for (const key of Object.keys(query)) {
    if (typeof query[key] === 'object') {
      if (adapter.encodingMethod) {
        result[key] = adapter.encodingMethod(query[key]);
      } else {
        result[key] = JSON.stringify(query[key]);
      };
    } else { result[key] = query[key] };
  };
  return result;
};
