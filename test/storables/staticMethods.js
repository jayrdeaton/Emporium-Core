const { is, isnt } = require('amprisand'),
  { faker } = require('@faker-js/faker'),
  Emporium = require('../../'),
  MemoryAdapter = require('@emporium/memory-adapter')
let Storable

describe('staticMethods', () => {
  describe('setup', () => {
    it('should create a new Emporium and Storable with a static method', () => {
      const adapter = new MemoryAdapter()
      adapter.is(Object)
      const emporium = new Emporium(adapter)
      Storable = emporium.define('Test_Model', {
        id: {type: String, default: faker.datatype.uuid},
        key: String
      }, {
        staticMethods: {
          method: (i) => { return i }
        }
      })
    })
  })
  describe('Storable.method()', () => {
    it('should have static method', async () => {
      is(Storable.method)
      const s = faker.datatype.uuid()
      const result = Storable.method(s)
      is(result)
      result.is(s)
    })
  })
})
