let axios = require('axios');

let APIAdapter = class APIAdapter {
  constructor(data) {
    this.domain = null;
    this.headers = null;

    if (!data) return;

    if (data.domain) this.domain = data.domain;
    if (data.headers) this.headers = data.headers;
  };
  async create(schema, body) {
    let endpoint = schema.resourceName || schema.name;
    let request = {
      url: `${this.domain}/${endpoint}`,
      method: 'POST',
      headers: this.headers,
      data: JSON.stringify(body)
    };
    let response = await axios(request);
    return response.data;
  };
  async update(schema, body) {
    let endpoint = schema.resourceName || schema.name;
    let url = `${this.domain}/${endpoint}`;
    if (schema.identifier && body[schema.identifier]) url += `/${body[schema.identifier]}`;
    let request = {
      url,
      method: 'PUT',
      headers: this.headers,
      data: JSON.stringify(body)
    };
    let response = await axios(request);
    return response.data;
  };
  async get(schema, query) {
    let endpoint = schema.resourceName || schema.name;
    let request = {
      url: `${this.domain}/${endpoint}`,
      method: 'GET',
      headers: this.headers
    };
    if (query) {
      request.params = {};
      Object.keys(query).forEach((key) => { request.params[key] = JSON.stringify(query[key]) });
    };
    let response = await axios(request);
    return response.data;
  };
  async find(schema, identifier) {
    let endpoint = schema.resourceName || schema.name;
    let request = {
      url: `${this.domain}/${endpoint}/${identifier}`,
      method: 'GET',
      headers: this.headers
    };
    let response = await axios(request);
    return response.data;
  };
  async delete(schema, body) {
    let endpoint = schema.resourceName || schema.name;
    let url = `${this.domain}/${endpoint}`;
    if (schema.identifier && body[schema.identifier]) url += `/${body[schema.identifier]}`;
    let request = {
      url,
      method: 'DELETE',
      headers: this.headers,
      data: JSON.stringify(body)
    };
    let response = await axios(request);
    return response.data;
  };
  setHeaders(headers) {
    if (!this.headers) return this.headers = headers;
    Object.keys(headers).forEach((key) => {
      this.headers[key] = headers[key];
    });
  };
};

module.exports = APIAdapter;
