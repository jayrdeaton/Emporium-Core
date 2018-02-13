module.exports = class Fetch extends Promise {
  constructor(executor, Model, filter, sort, limit, skip) {
    super(executor);
    this.filterObject = filter;
    this.limitValue = limit;
    this.skipValue = skip;
    this.sortObject = sort;

    this.Model = Model;
  };
  then(onFulfilled, onRejected) {
    let returnValue = super.then((collection) => {
      collection = collection.filter(this.filterObject).skip(this.skipValue).limit(this.limitValue).sort(this.sortObject).model(this.Model);
      onFulfilled(collection);
    }, onRejected);
    return returnValue;
  };
  filter(data) {
    this.filterObject = data;
    return this;
  };
  limit(data) {
    this.limitValue = data;
    return this;
  };
  skip(data) {
    this.skipValue = data;
    return this;
  };
  sort(data) {
    this.sortObject = data;
    return this;
  };
};
