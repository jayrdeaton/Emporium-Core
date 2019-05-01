const { is, isnt } = require('amprisand'),
  uuid = require('uuid'),
  faker = require('faker'),
  Emporium = require('../../'),
  { APIAdapter } = Emporium;
let Storable, storables = [];

describe('APIAdapter', () => {
  describe('new APIAdapter()', () => {
    it('should create and configure a new API Adapter', () => {
      const adapter = new APIAdapter({
        domain: 'http://localhost:8000',
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      });
      adapter.is(Object);
      const identifier = 'id';
      const emporium = new Emporium({ adapter, identifier });
      emporium.adapter.is(adapter);
      emporium.identifier.is('id');

      Storable = emporium.define('Test_Model', {
        id: {type: String, default: uuid.v1},
        key: String
      });

      is(Storable);
    });
  });
  describe('adapter.setHeaders()', () => {
    it('should configure an API Adapters headers', () => {
      const adapter = new APIAdapter({
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
      const adapter = new APIAdapter({
        domain: 'http://localhost:8000',
      });
      adapter.is(Object);
      adapter.setDomain('Test');
      adapter.domain.is('Test');
    });
  });
  describe('schema.setResourceName()', () => {
    it('should set the resourceName for this schema', () => {
      Storable.schema.setResourceName('test_models');
      Storable.schema.resourceName.is('test_models');
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
      const object = new Storable({key: faker.random.word()});
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
  describe('Storable.update({})', () => {
    it('should update a storable', async () => {
      const object = storables[0];
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
      const filter = {key: storables[0].key}
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
      const sort = {date:-1};
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
      const limit = 1;
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
      const skip = 1;
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
      const offset = 1;
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
      const object = storables[0];
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
      const object = storables[0];
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
      const object = storables[0];
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
      const object = storables[0];
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
      const object = storables[0];
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
      const data = JSON.parse(request.data);
      data.is(Object);
      JSON.parse(request.data).is(object);
      return;
    });
  });
  describe('storable.delete()', () => {
    it('should delete a storable', async () => {
      const object = storables[0];
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
