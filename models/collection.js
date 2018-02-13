module.exports = class Collection extends Array {
  constructor(...args) {
    super(...args);
  };
  filter(data) {
    if (!data) return this;
    let result;
    for (let key of Object.keys(data)) {
      if (typeof data[key] === 'string') result = super.filter(object => object[key] === data[key]);
      if (typeof data[key] === 'object') result = super.filter(object => data[key].test(object[key]));
    };
    return result;
  };
  limit(data) {
    if (!data) return this;
    return this.splice(0, data);;
  };
  skip(data) {
    if (!data) return this;
    this.splice(0, data);
    return this;
  };
  sort(data) {
    if (!data) return this;
    for (let key of Object.keys(data).reverse()) {
      if (data[key] < 0 ) {
        super.sort((a, b) => {
          if (String(a[key]).toLowerCase() < String(b[key]).toLowerCase()) return 1;
          if (String(a[key]).toLowerCase() > String(b[key]).toLowerCase()) return -1;
          return 0;
        });
      } else {
        super.sort((a, b) => {
          if (String(a[key]).toLowerCase() > String(b[key]).toLowerCase()) return 1;
          if (String(a[key]).toLowerCase() < String(b[key]).toLowerCase()) return -1;
          return 0;
        });
      };
    };
    return this;
  };
  model(Model) {
    let result = new Collection();
    for (let object of this) {
      result.push(new Model(object));
    };
    return result;
  };
};
