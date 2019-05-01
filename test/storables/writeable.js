const { is, isnt } = require('amprisand'),
  uuid = require('uuid'),
  faker = require('faker'),
  Emporium = require('../../'),
  { MemoryAdapter } = Emporium;
let Storable;

describe('writable', () => {
  describe('setup', () => {
    it('should create a new Emporium and Storable', () => {
      const adapter = new MemoryAdapter();
      adapter.is(Object);
      const emporium = new Emporium(adapter);
      Storable = emporium.define('Test_Model', {
        id: {type: String, default: uuid.v1},
        key: String
      }, {
        writable: false
      });
    });
  });
  describe('emporium.create', () => {
    it( 'should fail to create', async () => {
      let result;
      try {
        await Storable.create({ key: 'test' });
      } catch(err) {
        result = err;
      };
      is(result);
    });
  });
  describe('emporium.update', () => {
    it( 'should fail to update', async () => {
      let result;
      try {
        await Storable.update({ key: 'test' });
      } catch(err) {
        result = err;
      };
      is(result);
    });
  });
});
