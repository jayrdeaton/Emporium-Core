const { is, isnt } = require('amprisand'),
  uuid = require('uuid'),
  faker = require('faker'),
  Emporium = require('../../'),
  { MemoryAdapter } = Emporium;
let Storable;

describe('readable', () => {
  describe('setup', () => {
    it('should create a new Emporium and Storable', () => {
      const adapter = new MemoryAdapter();
      adapter.is(Object);
      const emporium = new Emporium(adapter);
      Storable = emporium.define('Test_Model', {
        id: {type: String, default: uuid.v1},
        key: String
      }, {
        readable: false
      });
    });
  });
  describe('emporium.get', () => {
    it( 'should fail to get', async () => {
      let result;
      try {
        await Storable.get();
      } catch(err) {
        result = err;
      };
      is(result);
    });
  });
  describe('emporium.find', () => {
    it( 'should fail to find', async () => {
      let result;
      try {
        await Storable.get('test');
      } catch(err) {
        result = err;
      };
      is(result);
    });
  });
});
