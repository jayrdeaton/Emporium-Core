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
        beforeDefine: (attributes, options) => {
          attributes.test = {type: String, default: faker.random.word}
          options.writable = false;
        }
      });
    });
  });
  describe('emporium.define', () => {
    it( 'should call hook', () => {
      const result = emporium.define('Test_Model', {
        id: {type: String, default: faker.random.uuid},
        key: String
      });
      is(result);
      is(result.schema.attributes.test);
      isnt(result.schema.writeable);
    });
  });
});
