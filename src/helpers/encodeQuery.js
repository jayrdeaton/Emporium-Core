module.exports = (adapter, query) => {
  for (const key of Object.keys(query)) {
    if (typeof query[key] === 'object') {
      if (adapter.encodingMethod) {
        request.params[key] = adapter.encodingMethod(query[key]);
      } else {
        request.params[key] = JSON.stringify(query[key]);
      };
    } else { request.params[key] = query[key] };
  });
};
