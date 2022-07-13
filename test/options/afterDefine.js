const { is, isnt } = require('amprisand'),
  { faker } = require('@faker-js/faker'),
  Emporium = require('../../'),
  MemoryAdapter = require('@emporium/memory-adapter')
let emporium

describe('afterDefine', () => {
  describe('setup', () => {
    it('should create a new Emporium', () => {
      const adapter = new MemoryAdapter()
      adapter.is(Object)
      emporium = new Emporium(adapter, {
        afterDefine: (Storable) => { Storable.schema.attributes.test = {type: String, default: faker.random.word } }
      })
    })
  })
  describe('emporium.define', () => {
    it('should call hook', () => {
      const result = emporium.define('Test_Model', {
        id: {type: String, default: faker.datatype.uuid},
        key: String
      })
      is(result)
      is(result.schema.attributes.test)
    })
  })
})
