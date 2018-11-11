let { is, isnt } = require('amprisand'),
  uuid = require('uuid'),
  faker = require('faker'),
  Emporium = require('../../'),
  { MemoryAdapter, Schema } = Emporium,
  schema, Storable, defaultValue, storables = [];

describe('locked', () => {
  describe(`new Schema({ key: { type: String, locked: true } })`, () => {
    it('should create a new Schema with a locked key', () => {
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
        key: {type: String, default: defaultValue, locked: true}
      });
      Storable = emporium.storable('Test_Model', schema);
      is(schema.locked.includes('key'));
      is(Storable);
    });
  });
  describe('Storable.create()', () => {
    it('should create a storable with locked value', async () => {
      let storable, error;
      try {
        storable = await Storable.create();
      } catch(err) {
        error = err;
      };
      isnt(error);
      is(storable);
      storable.key.is(defaultValue);
      storable.key = faker.random.word();
      storable.key.is(defaultValue);
    });
  });
  describe(`schema.lock('key')`, () => {
    it('should lock key', () => {
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
      schema.lock('key');
      Storable = emporium.storable('Test_Model', schema);
      is(schema.locked.includes('key'));
      is(Storable);
    });
  });
  describe('Storable.create()', () => {
    it('should create a storable with locked value', async () => {
      let storable, error;
      try {
        storable = await Storable.create();
      } catch(err) {
        error = err;
      };
      isnt(error);
      is(storable);
      storable.key.is(defaultValue);
      storable.key = faker.random.word();
      storable.key.is(defaultValue);
    });
  });
});
