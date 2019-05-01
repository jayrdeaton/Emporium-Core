const { is, isnt } = require('amprisand'),
  uuid = require('uuid'),
  faker = require('faker'),
  Emporium = require('../../../'),
  { MemoryAdapter } = Emporium;
let adapter, emporiumStorable, defaultValue, storables = [];

describe('hidden', () => {
  describe('setup', () => {
    it(' should setup emporium', () => {
      adapter = new MemoryAdapter();
      adapter.is(Object);
      emporium = new Emporium(adapter);
      emporium.is(Object);
    });
  });
  describe(`define('Test', { key: { type: String, hidden: true } })`, () => {
    it('should define a new Storable with a hidden key', () => {
      defaultValue = faker.random.word();
      Storable = emporium.define('Test_Model', {
        id: {type: String, default: uuid.v1},
        key: {type: String, default: defaultValue, hidden: true}
      });
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
