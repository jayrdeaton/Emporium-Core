let axios = require('axios'),
  { encodeQuery, wholeObject } = require('../helpers');

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
  async batch(schema, body, query) {
    let endpoint = schema.resourceName || schema.name;
    let data = JSON.stringify(wholeObject(body));
    let request = {
      url: `${this.domain}/${endpoint}/batch`,
      method: 'PUT',
      headers: this.headers,
      data
    };
    if (query) request.params = encodeQuery(this, query);
    if (process.env.NODE_ENV === 'EMPORIUM_TEST') throw request;
    let response = await axios(request);
    return response.data;
  };
  async count(schema, query) {
    let endpoint = schema.resourceName || schema.name;
    let request = {
      url: `${this.domain}/${endpoint}/count`,
      method: 'GET',
      headers: this.headers
    };
    if (query) request.params = encodeQuery(this, query);
    if (process.env.NODE_ENV === 'EMPORIUM_TEST') throw request;
    let response = await axios(request);
    return response.data.count;
  };
  async create(schema, body, query) {
    let endpoint = schema.resourceName || schema.name;
    let data = JSON.stringify(wholeObject(body));
    let request = {
      url: `${this.domain}/${endpoint}`,
      method: 'POST',
      headers: this.headers,
      data
    };
    if (query) request.params = encodeQuery(this, query);
    if (process.env.NODE_ENV === 'EMPORIUM_TEST') throw request;
    let response = await axios(request);
    return response.data;
  };
  async delete(schema, body) {
    if (!schema.identifier || (typeof body === 'object' && !body[schema.identifier])) return null;
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
  async duplicate(schema, identifier, query) {
    let endpoint = schema.resourceName || schema.name;
    let url = `${this.domain}/${endpoint}/${identifier}/duplicate`;
    let request = {
      url,
      method: 'GET',
      headers: this.headers
    };
    if (query) request.params = encodeQuery(this, query);
    if (process.env.NODE_ENV === 'EMPORIUM_TEST') throw request;
    let response = await axios(request);
    return response.data;
  };
  async find(schema, identifier, query) {
    let endpoint = schema.resourceName || schema.name;
    let url = `${this.domain}/${endpoint}/${identifier}`;
    let request = {
      url,
      method: 'GET',
      headers: this.headers
    };
    if (query) request.params = encodeQuery(this, query);
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
    if (query) request.params = encodeQuery(this, query);
    if (process.env.NODE_ENV === 'EMPORIUM_TEST') throw request;
    let response = await axios(request);
    return response.data;
  };
  async update(schema, body, query) {
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
    if (query) request.params = encodeQuery(this, query);
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
