module.exports = class Attribute {
  constructor(data) {
    this.default = data.default;
    this.name = data.name;
    this.required = data.required;
    this.type = data.type;
  };
};
