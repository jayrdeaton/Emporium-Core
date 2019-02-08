let { is, isnt } = require('amprisand'),
  uuid = require('uuid'),
  faker = require('faker'),
  Emporium = require('../../'),
  { MemoryAdapter, Schema } = Emporium,
  schema, Storable, defaultValue, storables = [];

describe('hidden', () => {
  describe(`new Schema({ key: { type: String, hidden: true } })`, () => {
    it('should create a new Schema with a hidden key', () => {
      let adapter = new MemoryAdapter();
      adapter.is(Object);
      let emporium = new Emporium();
      emporium.setAdapter(adapter);
      emporium._adapter.is(adapter);
      emporium.setIdentifier('id');
      emporium._identifier.is('id');
      defaultValue = faker.random.word();
      schema = new Schema({
        id: {type: String, default: uuid.v1},
        key: {type: String, default: defaultValue, hidden: true}
      });
      Storable = emporium.storable('Test_Model', schema);
      is(Storable);
    });
  });
  describe('Storable.create()', () => {
    it('should create a storable with hidden value', async () => {
      let storable, error;
      try {
        storable = await Storable.create();
      } catch(err) {
        error = err;
      };
      isnt(error);
      is(storable);
      storable.key.is(defaultValue);
      isnt(Object.keys(storable).includes('key'));
    });
  });
  describe(`schema.hide('key')`, () => {
    it('should hide a key', () => {
      let adapter = new MemoryAdapter();
      adapter.is(Object);
      let emporium = new Emporium();
      emporium.setAdapter(adapter);
      emporium._adapter.is(adapter);
      emporium.setIdentifier('id');
      emporium._identifier.is('id');
      defaultValue = faker.random.word();
      schema = new Schema({
        id: {type: String, default: uuid.v1},
        key: {type: String, default: defaultValue}
      });
      schema.hide('key');
      Storable = emporium.storable('Test_Model', schema);
      is(Storable);
    });
  });
  describe('Storable.create()', () => {
    it('should create a storable with hidden value', async () => {
      let storable, error;
      try {
        storable = await Storable.create();
      } catch(err) {
        error = err;
      };
      isnt(error);
      is(storable);
      storable.key.is(defaultValue);
      isnt(Object.keys(storable).includes('key'));
    });
  });
});