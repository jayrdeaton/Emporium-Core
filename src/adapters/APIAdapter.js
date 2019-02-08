let axios = require('axios'),
  { wholeObject } = require('../helpers');

let APIAdapter = class APIAdapter {
  constructor(data) {
    this.domain = null;
    this.headers = null;
    this.encodingMethod = null;

    if (!data) return;

    if (data.domain) this.domain = data.domain;
    if (data.headers) this.headers = data.headers;
    if (data.encodingMethod) this.encodingMethod = data.encodingMethod;
  };
  async count(schema, query) {
    let endpoint = schema.resourceName || schema.name;
    let request = {
      url: `${this.domain}/${endpoint}/count`,
      method: 'GET',
      headers: this.headers
    };
    if (query) {
      request.params = {};
      Object.keys(query).forEach((key) => {
        if (typeof query[key] === 'object') {
          if (this.encodingMethod) {
            request.params[key] = this.encodingMethod(query[key]);
          } else {
            request.params[key] = JSON.stringify(query[key]);
          };
        } else { request.params[key] = query[key] };
      });
    };
    if (process.env.NODE_ENV === 'EMPORIUM_TEST') throw request;
    let response = await axios(request);
    return response.data;
  };
  async create(schema, body) {
    let endpoint = schema.resourceName || schema.name;
    let data = JSON.stringify(wholeObject(body));
    let request = {
      url: `${this.domain}/${endpoint}`,
      method: 'POST',
      headers: this.headers,
      data
    };
    if (process.env.NODE_ENV === 'EMPORIUM_TEST') throw request;
    let response = await axios(request);
    return response.data;
  };
  async delete(schema, body) {
    if (!schema.identifier || (typeof body === 'object' && !body[schema.identifier])) {
      return null;
    }
    let endpoint = schema.resourceName || schema.name;
    let url = `${this.domain}/${endpoint}`;
    if (typeof body === 'string') {
      url += `/${body}`;
    } else {
      url += `/${body[schema.identifier]}`;
    };
    let request = {
      url,
      method: 'DELETE',
      headers: this.headers
    };
    if (process.env.NODE_ENV === 'EMPORIUM_TEST') throw request;
    let response = await axios(request);
    return response.data;
  };
  async find(schema, identifier) {
    let endpoint = schema.resourceName || schema.name;
    let url = `${this.domain}/${endpoint}/${identifier}`;
    let request = {
      url,
      method: 'GET',
      headers: this.headers
    };
    if (process.env.NODE_ENV === 'EMPORIUM_TEST') throw request;
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
      Object.keys(query).forEach((key) => {
        if (typeof query[key] === 'object') {
          if (this.encodingMethod) {
            request.params[key] = this.encodingMethod(query[key]);
          } else {
            request.params[key] = JSON.stringify(query[key]);
          };
        } else { request.params[key] = query[key] };
      });
    };
    if (process.env.NODE_ENV === 'EMPORIUM_TEST') throw request;
    let response = await axios(request);
    return response.data;
  };
  async update(schema, body) {
    if (!schema.identifier || !body[schema.identifier]) return null;
    let endpoint = schema.resourceName || schema.name;
    let data = JSON.stringify(wholeObject(body));
    let url = `${this.domain}/${endpoint}/${body[schema.identifier]}`;
    let request = {
      url,
      method: 'PUT',
      headers: this.headers,
      data
    };
    if (process.env.NODE_ENV === 'EMPORIUM_TEST') throw request;
    let response = await axios(request);
    return response.data;
  };
  setHeaders(headers) {
    if (!this.headers) return this.headers = headers;
    Object.keys(headers).forEach((key) => {
      this.headers[key] = headers[key];
    });
  };
  setDomain(domain) {
    this.domain = domain;
  }
};

module.exports = APIAdapter;
