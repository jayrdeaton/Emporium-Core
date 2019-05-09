const { is, isnt } = require('amprisand'),
  faker = require('faker'),
  Emporium = require('../../'),
  MemoryAdapter = require('@emporium/memory-adapter');
let Storable;

describe('readable', () => {
  describe('setup', () => {
    it('should create a new Emporium and Storable', () => {
      const adapter = new MemoryAdapter();
      adapter.is(Object);
      const emporium = new Emporium(adapter);
      Storable = emporium.define('Test_Model', {
        id: {type: String, default: faker.random.uuid},
        key: String
      }, {
        readable: false
      });
    });
  });
  describe('Storable.get()', () => {
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
  describe('Storable.find()', () => {
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
