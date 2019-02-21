let { is, isnt } = require('amprisand'),
  uuid = require('uuid'),
  faker = require('faker'),
  Emporium = require('../../'),
  { APIAdapter, Schema } = Emporium,
  schema, Storable, storables = [];

describe('APIAdapter', () => {
  describe('new APIAdapter()', () => {
    it('should create and configure a new API Adapter', () => {
      let adapter = new APIAdapter({
        domain: 'http://localhost:8000',
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      });
      adapter.is(Object);
      let emporium = new Emporium();
      emporium.setAdapter(adapter);
      emporium._adapter.is(adapter);
      emporium.setIdentifier('id');
      emporium._identifier.is('id');
      schema = new Schema({
        id: {type: String, default: uuid.v1},
        key: String
      });
      Storable = emporium.storable('Test_Model', schema);
      is(Storable);
    });
  });
  describe('adapter.setHeaders()', () => {
    it('should configure an API Adapters headers', () => {
      let adapter = new APIAdapter({
        domain: 'http://localhost:8000',
      });
      adapter.is(Object);
      isnt(adapter.headers);
      adapter.setHeaders({ 'Test': 'Test' });
      adapter.headers.is({ 'Test': 'Test' });
    });
  });
  describe('adapter.setDomain()', () => {
    it('should configure an API Adapters domain', () => {
      let adapter = new APIAdapter({
        domain: 'http://localhost:8000',
      });
      adapter.is(Object);
      adapter.setDomain('Test');
      adapter.domain.is('Test');
    });
  });
  describe('schema.setResourceName()', () => {
    it('should set the resourceName for this schema', () => {
      schema.setResourceName('test_models');
      schema.resourceName.is('test_models');
    });
  });
  describe('Storable.create()', () => {
    it('should create a new storable with default values', async () => {
      let request;
      try {
        await Storable.create();
      } catch(req) {
        request = req;
      };
      request.is();
      request.is(Object);
      request.url.is('http://localhost:8000/test_models');
      request.method.is('POST');
      request.headers.is({ 'Content-Type': 'application/json; charset=utf-8' });
      return;
    });
  });
  describe('Storable.create({})', () => {
    it('should create a new storable with set values', async () => {
      let object = new Storable({key: faker.random.word()});
      storables.push(object);
      let request;
      try {
        await Storable.create(object);
      } catch(req) {
        request = req;
      };
      request.is();
      request.is(Object);
      request.url.is('http://localhost:8000/test_models');
      request.method.is('POST');
      request.headers.is({ 'Content-Type': 'application/json; charset=utf-8' });
      JSON.parse(request.data).is(object);
      return;
    });
  });
  describe('Storable.batch()', () => {
    it('should update a batch of storables', async () => {
      let request;
      let query = { filter: { name: 'test' } };
      try {
        await Storable.batch({id: 'test'}, query);
      } catch(req) {
        request = req;
      };
      request.is();
      request.is(Object);
      request.url.is('http://localhost:8000/test_models/batch');
      request.params.filter.is(JSON.stringify(query.filter));
      request.method.is('PUT');
      request.headers.is({ 'Content-Type': 'application/json; charset=utf-8' });
      return;
    });
  });
  describe('Storable.count()', () => {
    it('should count how many storables', async () => {
      let request;
      try {
        await Storable.count();
      } catch(req) {
        request = req;
      };
      request.is();
      request.is(Object);
      request.url.is('http://localhost:8000/test_models/count');
      request.method.is('GET');
      request.headers.is({ 'Content-Type': 'application/json; charset=utf-8' });
      return;
    });
  });
  describe('Storable.duplicate()', () => {
    it('should duplicate a storable', async () => {
      let request;
      try {
        await Storable.duplicate('test_id');
      } catch(req) {
        request = req;
      };
      request.is();
      request.is(Object);
      request.url.is('http://localhost:8000/test_models/test_id/duplicate');
      request.method.is('GET');
      request.headers.is({ 'Content-Type': 'application/json; charset=utf-8' });
      return;
    });
  });
  describe('Storable.update({})', () => {
    it('should update a storable', async () => {
      let object = storables[0];
      object.key = faker.random.word();
      let request;
      try {
        await Storable.update(object);
      } catch(req) {
        request = req;
      };
      request.is();
      request.is(Object);
      request.url.is(`http://localhost:8000/test_models/${object.id}`);
      request.method.is('PUT');
      request.headers.is({ 'Content-Type': 'application/json; charset=utf-8' });
      JSON.parse(request.data).is(object);
      return;
    });
  });
  describe('Storable.get()', () => {
    it('should get an array of four storables', async () => {
      let request;
      try {
        await Storable.get();
      } catch(req) {
        request = req;
      };
      request.is();
      request.is(Object);
      request.url.is('http://localhost:8000/test_models');
      request.method.is('GET');
      request.headers.is({ 'Content-Type': 'application/json; charset=utf-8' });
      isnt(request.data)
      return;
    });
  });
  describe('Storable.get(filter)', () => {
    it('should get a filtered array of one storables', async () => {
      let request;
      let filter = {key: storables[0].key}
      try {
        await Storable.get({ filter });
      } catch(req) {
        request = req;
      };
      request.is();
      request.is(Object);
      request.url.is('http://localhost:8000/test_models');
      request.method.is('GET');
      request.headers.is({ 'Content-Type': 'application/json; charset=utf-8' });
      JSON.parse(request.params.filter).is(filter);
      isnt(request.data)
      return;
    });
  });
  describe('Storable.get(sort)', () => {
    it('should get a sorted array of four storables', async () => {
      let request;
      let sort = {date:-1};
      try {
        await Storable.get({ sort });
      } catch(req) {
        request = req;
      };
      request.is();
      request.is(Object);
      request.url.is('http://localhost:8000/test_models');
      request.method.is('GET');
      request.headers.is({ 'Content-Type': 'application/json; charset=utf-8' });
      JSON.parse(request.params.sort).is(sort);
      isnt(request.data)
      return;
    });
  });
  describe('Storable.get(limit)', () => {
    it('should get a limited array of one storables', async () => {
      let request;
      let limit = 1;
      try {
        await Storable.get({ limit });
      } catch(req) {
        request = req;
      };
      request.is();
      request.is(Object);
      request.url.is('http://localhost:8000/test_models');
      request.method.is('GET');
      request.headers.is({ 'Content-Type': 'application/json; charset=utf-8' });
      JSON.parse(request.params.limit).is(limit);
      isnt(request.data)
      return;
    });
  });
  describe('Storable.get(skip)', () => {
    it('should get a skipped array of three storables', async () => {
      let request;
      let skip = 1;
      try {
        await Storable.get({ skip });
      } catch(req) {
        request = req;
      };
      request.is();
      request.is(Object);
      request.url.is('http://localhost:8000/test_models');
      request.method.is('GET');
      request.headers.is({ 'Content-Type': 'application/json; charset=utf-8' });
      JSON.parse(request.params.skip).is(skip);
      isnt(request.data)
      return;
    });
  });
  describe('Storable.get(offset)', () => {
    it('should get an offset array of three storables', async () => {
      let request;
      let offset = 1;
      try {
        await Storable.get({ offset });
      } catch(req) {
        request = req;
      };
      request.is();
      request.is(Object);
      request.url.is('http://localhost:8000/test_models');
      request.method.is('GET');
      request.headers.is({ 'Content-Type': 'application/json; charset=utf-8' });
      JSON.parse(request.params.offset).is(offset);
      isnt(request.data)
      return;
    });
  });
  describe('Storable.find({})', () => {
    it('should get a storable', async () => {
      let object = storables[0];
      let request;
      try {
        await Storable.find(object);
      } catch(req) {
        request = req;
      };
      request.is();
      request.is(Object);
      request.url.is(`http://localhost:8000/test_models/${object.id}`);
      request.method.is('GET');
      request.headers.is({ 'Content-Type': 'application/json; charset=utf-8' });
      isnt(request.data)
      return;
    });
  });
  describe('Storable.find(identifier)', () => {
    it('should get a storable', async () => {
      let object = storables[0];
      let request;
      try {
        await Storable.find(object.id);
      } catch(req) {
        request = req;
      };
      request.is();
      request.is(Object);
      request.url.is(`http://localhost:8000/test_models/${object.id}`);
      request.method.is('GET');
      request.headers.is({ 'Content-Type': 'application/json; charset=utf-8' });
      isnt(request.data)
      return;
    });
  });
  describe('Storable.delete(identifier)', () => {
    it('should delete a storable', async () => {
      let object = storables[0];
      let request;
      try {
        await Storable.delete(object.id);
      } catch(req) {
        request = req;
      };
      request.is();
      request.is(Object);
      request.url.is(`http://localhost:8000/test_models/${object.id}`);
      request.method.is('DELETE');
      request.headers.is({ 'Content-Type': 'application/json; charset=utf-8' });
      return;
    });
  });
  describe('Storable.delete({})', () => {
    it('should delete a storable', async () => {
      let object = storables[0];
      let request;
      try {
        await Storable.delete(object);
      } catch(req) {
        request = req;
      };
      request.is();
      request.is(Object);
      request.url.is(`http://localhost:8000/test_models/${object.id}`);
      request.method.is('DELETE');
      request.headers.is({ 'Content-Type': 'application/json; charset=utf-8' });
      return;
    });
  });
  describe('storable.save()', () => {
    it('should update a storable', async () => {
      let object = storables[0];
      object.number = faker.random.number();
      let request;
      try {
        await object.save();
      } catch(req) {
        request = req;
      };
      request.is();
      request.is(Object);
      request.url.is(`http://localhost:8000/test_models/${object.id}`);
      request.method.is('PUT');
      request.headers.is({ 'Content-Type': 'application/json; charset=utf-8' });
      let data = JSON.parse(request.data);
      data.is(Object);
      JSON.parse(request.data).is(object);
      return;
    });
  });
  describe('storable.delete()', () => {
    it('should delete a storable', async () => {
      let object = storables[0];
      let request;
      try {
        await object.delete();
      } catch(req) {
        request = req;
      };
      request.is();
      request.is(Object);
      request.url.is(`http://localhost:8000/test_models/${object.id}`);
      request.method.is('DELETE');
      request.headers.is({ 'Content-Type': 'application/json; charset=utf-8' });
      return;
    });
  });
});
