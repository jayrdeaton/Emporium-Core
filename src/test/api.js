let { is, isnt } = require('amprisand'),
  uuid = require('uuid'),
  faker = require('faker'),
  Emporium = require('../../'),
  { APIAdapter, Schema } = Emporium,
  emporium, adapter, schema, Storable, storables = [];

let fakeObject = () => {
  return {
    uuid: uuid.v1(),

    array: [faker.random.word()],
    boolean: faker.random.boolean(),
    date: Date.now(),
    number: faker.random.number(),
    object: {test: faker.random.word()},
    string: faker.random.word(),

    hidden: faker.random.word(),
    locked: faker.random.word()
  };
};

describe('API', () => {
  describe('new Emporium()', () => {
    it('should create a new Emporium', () => {
      emporium = new Emporium();
      emporium.is(Object);
    });
  });
  describe('new APIAdapter()', () => {
    it('should create and configure a new API Adapter', () => {
      adapter = new APIAdapter({
        domain: 'http://localhost:8080',
      });
      adapter.is(Object);
    });
  });
  describe('emporium.setAdapter()', () => {
    it('should set the adapter for this emporium', () => {
      emporium.setAdapter(adapter);
      emporium._adapter.is(adapter);
    });
  });
  describe('emporium.setIdentifier()', () => {
    it('should set the identifier for this emporium', () => {
      emporium.setIdentifier('id');
      emporium._identifier.is('id');
    });
  });
  describe('new Schema()', () => {
    it('should create a new Schema', () => {
      schema = new Schema({
        uuid: {type: String, default: uuid.v1},

        array: {type: Array, default: []},
        boolean: {type: Boolean, default: false},
        date: {type: Number, default: Date.now},
        number: {type: Number, default: 0},
        object: {type: Object, default: {}},
        string: {type: String, default: null},

        hidden: {type: String, default: null},
        locked: {type: String, default: null}
      });
      schema.hide('hidden').lock('locked');
      schema.is(Object);
    });
  });
  describe('emporium.storable()', () => {
    it('should create a new Storable', () => {
      Storable = emporium.storable('API_Test_Model', schema);
      schema.adapter.is(adapter);
      schema.identifier.is('id');
      is(Storable);
    });
  });
  describe('emporium.storables[Storable]', () => {
    it('Storable should be available through emporium', () => {
      is(emporium['API_Test_Model']);
    });
  });
  describe('emporium.storables[Other]', () => {
    it('Other should not be available through emporium', () => {
      isnt(emporium['Test']);
    });
  });
  describe('schema.setAdapter()', () => {
    it('should set the adapter for this schema', () => {
      adapter = new APIAdapter({
        domain: 'http://localhost:8000',
        headers: { "Content-Type": "application/json; charset=utf-8" }
      });
      adapter.is(Object);
      schema.setAdapter(adapter);
      schema.adapter.is(adapter);
      emporium._adapter.isnt(adapter);
    });
  });
  describe('schema.setIdentifier()', () => {
    it('should set the adapter for this schema', () => {
      schema.setIdentifier('uuid');
      schema.identifier.is('uuid');
      emporium._identifier.isnt('uuid');
    });
  });
  describe('schema.setResourceName()', () => {
    it('should set the resourceName for this schema', () => {
      schema.setResourceName('api_test_models');
      schema.resourceName.is('api_test_models');
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
      request.url.is('http://localhost:8000/api_test_models');
      request.method.is('POST');
      request.headers.is({ 'Content-Type': 'application/json; charset=utf-8' });
      return;
    });
  });
  describe('Storable.create({})', () => {
    it('should create a new storable with set values', async () => {
      let object = new Storable(fakeObject());
      storables.push(object);
      let request;
      try {
        await Storable.create(object);
      } catch(req) {
        request = req;
      };
      request.is();
      request.is(Object);
      request.url.is('http://localhost:8000/api_test_models');
      request.method.is('POST');
      request.headers.is({ 'Content-Type': 'application/json; charset=utf-8' });
      JSON.parse(request.data).is(object);
      return;
    });
  });
  describe('Storable.update({})', () => {
    it('should update a storable', async () => {
      let object = storables[0];
      object.number = faker.random.number();
      let request;
      try {
        await Storable.update(object);
      } catch(req) {
        request = req;
      };
      request.is();
      request.is(Object);
      request.url.is(`http://localhost:8000/api_test_models/${object.uuid}`);
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
      request.url.is('http://localhost:8000/api_test_models');
      request.method.is('GET');
      request.headers.is({ 'Content-Type': 'application/json; charset=utf-8' });
      isnt(request.data)
      return;
    });
  });
  describe('Storable.get(filter)', () => {
    it('should get a filtered array of one storables', async () => {
      let request;
      let filter = {string: storables[0].string}
      try {
        await Storable.get({ filter });
      } catch(req) {
        request = req;
      };
      request.is();
      request.is(Object);
      request.url.is('http://localhost:8000/api_test_models');
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
      request.url.is('http://localhost:8000/api_test_models');
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
      request.url.is('http://localhost:8000/api_test_models');
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
      request.url.is('http://localhost:8000/api_test_models');
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
      request.url.is('http://localhost:8000/api_test_models');
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
      request.url.is(`http://localhost:8000/api_test_models/${object.uuid}`);
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
        await Storable.find(object.uuid);
      } catch(req) {
        request = req;
      };
      request.is();
      request.is(Object);
      request.url.is(`http://localhost:8000/api_test_models/${object.uuid}`);
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
        await Storable.delete(object.uuid);
      } catch(req) {
        request = req;
      };
      request.is();
      request.is(Object);
      request.url.is(`http://localhost:8000/api_test_models/${object.uuid}`);
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
      request.url.is(`http://localhost:8000/api_test_models/${object.uuid}`);
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
      request.url.is(`http://localhost:8000/api_test_models/${object.uuid}`);
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
      request.url.is(`http://localhost:8000/api_test_models/${object.uuid}`);
      request.method.is('DELETE');
      request.headers.is({ 'Content-Type': 'application/json; charset=utf-8' });
      return;
    });
  });
});
