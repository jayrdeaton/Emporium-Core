const { is, isnt } = require('amprisand'),
  uuid = require('uuid'),
  faker = require('faker'),
  Emporium = require('../../../'),
  { MemoryAdapter } = Emporium;
let Storable, storable, defaultValue, storables = [];

describe('required', () => {
  describe('setup', () => {
    it(' should setup emporium', () => {
      adapter = new MemoryAdapter();
      adapter.is(Object);
      emporium = new Emporium({ adapter });
      emporium.is(Object);
    });
  });
  describe(`define('Test', { key: { type: String, required: true } })`, () => {
    it('should define a new Storable with a required key', () => {
      defaultValue = faker.random.word();
      Storable = emporium.define('Test_Model', {
        id: {type: String, default: uuid.v1},
        key: {type: String, required: true}
      });
      is(Storable);
      is(Storable.schema.required.includes('key'));
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
