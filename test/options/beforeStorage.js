const { is, isnt } = require('amprisand'),
  { faker } = require('@faker-js/faker'),
  Emporium = require('../../'),
  MemoryAdapter = require('@emporium/memory-adapter')
let emporium, Storable

describe('beforeStorage', () => {
  describe('setup', () => {
    it('should create a new Emporium and Storable', () => {
      const adapter = new MemoryAdapter()
      adapter.is(Object)
      emporium = new Emporium(adapter, {
        beforeStorage: (data) => { data.key = faker.random.word() }
      })
      Storable = emporium.define('Test_Model', {
        id: {type: String, default: faker.datatype.uuid},
        key: String
      })
    })
  })
  describe('emporium.create', () => {
    it('should call hook', async () => {
      object = await Storable.create()
      is(object)
      is(object.key)
      is(typeof object.key === 'string')
    })
  })
  describe('emporium.update', () => {
    it('should call hook', async () => {
      const original = object.key
      object = await Storable.update(object)
      is(object)
      is(object.key)
      is(typeof object.key === 'string')
      isnt(object.key === original)
    })
  })
})
