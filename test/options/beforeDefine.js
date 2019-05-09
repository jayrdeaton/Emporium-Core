const { is, isnt } = require('amprisand'),
  faker = require('faker'),
  Emporium = require('../../'),
  MemoryAdapter = require('@emporium/memory-adapter');
let emporium;

describe('beforeDefine', () => {
  describe('setup', () => {
    it('should create a new Emporium', () => {
      const adapter = new MemoryAdapter();
      adapter.is(Object);
      emporium = new Emporium(adapter, {
        beforeDefine: (attributes, options) => { throw { success: true, attributes, options }}
      });
    });
  });
  describe('emporium.define', () => {
    it( 'should call hook', () => {
      let result;
      try {
        emporium.define('Test_Model', {
          id: {type: String, default: faker.random.uuid},
          key: String
        }, {
          test: true
        });
      } catch(err) {
        result = err;
      };
      is(result);
      is(result.success);
      is(result.attributes);
      is(result.options);
    });
  });
});
