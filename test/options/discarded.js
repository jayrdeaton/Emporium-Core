let { is, isnt } = require('amprisand'),
  uuid = require('uuid'),
  faker = require('faker'),
  Emporium = require('../../'),
  { MemoryAdapter, Schema } = Emporium,
  schema, Storable, defaultValue, storables = [];

describe('discarded', () => {
  describe(`new Schema({ key: { type: String, discarded: true } })`, () => {
    it('should create a new Schema with a discarded key', () => {
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
        key: {type: String, default: defaultValue, discarded: true}
      });
      schema.discarded.includes('key').is();
      Storable = emporium.storable('Test_Model', schema);
      is(Storable);
    });
  });
  describe('Storable.create()', () => {
    it('should create a storable with discarded value', async () => {
      let storable, error;
      try {
        storable = await Storable.create();
      } catch(err) {
        error = err;
      };
      isnt(error);
      is(storable);
      storable.key.is(defaultValue);
    });
  });
  describe(`schema.discard('key')`, () => {
    it('should discard a key', () => {
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
      schema.discard('key');
      Storable = emporium.storable('Test_Model', schema);
      is(Storable);
    });
  });
  describe('Storable.create()', () => {
    it('should create a storable with discarded value', async () => {
      let storable, error;
      try {
        storable = await Storable.create();
      } catch(err) {
        error = err;
      };
      isnt(error);
      is(storable);
      storable.key.is(defaultValue);
    });
  });
});
