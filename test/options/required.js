let { is, isnt } = require('amprisand'),
  uuid = require('uuid'),
  faker = require('faker'),
  Emporium = require('../../'),
  { MemoryAdapter, Schema } = Emporium,
  schema, Storable, storable, defaultValue, storables = [];

describe('required', () => {
  describe(`new Schema({ key: { type: String, required: true } })`, () => {
    it('should create a new Schema with a required key', () => {
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
        key: {type: String, required: true}
      });
      Storable = emporium.storable('Test_Model', schema);
      is(schema.required.includes('key'));
      is(Storable);
    });
  });
  describe(`schema.require('key')`, () => {
    it('should require a key', () => {
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
        key: {type: String}
      });
      schema.require('key');
      Storable = emporium.storable('Test_Model', schema);
      is(schema.required.includes('key'));
      is(Storable);
    });
  });
  describe('Storable.create()', () => {
    it('should fail to create a storable without required value', async () => {
      let error;
      try {
        storable = await Storable.create();
      } catch(err) {
        error = err;
      };
      console.log(error);
      is(error);
      isnt(storable);
    });
  });
  describe('Storable.create({})', () => {
    it('should create a storable required value', async () => {
      let error, key = faker.random.word();
      try {
        storable = await Storable.create({ key });
      } catch(err) {
        error = err;
      };
      isnt(error);
      is(storable);
      storable.key.is(key);
    });
  });
  describe('Storable.update()', () => {
    it('should fail to update a storable without required value', async () => {
      let error;
      storable.key = null;
      try {
        await Storable.update(storable);
      } catch(err) {
        error = err;
      };
      is(error);
    });
  });
  describe('storable.save()', () => {
    it('should fail to save a storable without required value', async () => {
      let error;
      storable.key = null;
      try {
        await storable.save();
      } catch(err) {
        error = err;
      };
      is(error);
    });
  });
  describe('new Storable()', () => {
    it('should succeed to construct a storable without required value', async () => {
      let error;
      try {
        storable = new Storable();
      } catch(err) {
        error = err;
      };
      isnt(error);
      is(storable);
    });
  });
});
