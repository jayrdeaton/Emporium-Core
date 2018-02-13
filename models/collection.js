module.exports = class Collection extends Array {
  constructor(...args) {
    super(...args);
  };
  filter(data) {
    if (!data) return this;
    let result;
    for (let key of Object.keys(data)) result = super.filter(object => object[key] == data[key]);
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
        super.sort((b, a) => {
          if (a[key] > b[key]) return 1;
          if (a[key] > b[key]) return -1;
          return 0;
        });
      } else {
        super.sort((a, b) => {
          if (a[key] > b[key]) return 1;
          if (a[key] > b[key]) return -1;
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
