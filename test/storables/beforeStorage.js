const { is, isnt } = require('amprisand'),
  uuid = require('uuid'),
  faker = require('faker'),
  Emporium = require('../../'),
  { MemoryAdapter } = Emporium;
let Storable;

describe('beforeStorage', () => {
  describe('setup', () => {
    it('should create a new Emporium and Storable', () => {
      const adapter = new MemoryAdapter();
      adapter.is(Object);
      const emporium = new Emporium(adapter);
      Storable = emporium.define('Test_Model', {
        id: {type: String, default: uuid.v1},
        key: String
      }, {
        beforeStorage: (data) => { throw { success: true, data } }
      });
    });
  });
  describe('emporium.create', () => {
    it( 'should call hook', async () => {
      let result;
      try {
        await Storable.create();
      } catch(err) {
        result = err;
      };
      is(result);
      is(result.success);
      is(result.data);
    });
  });
});
