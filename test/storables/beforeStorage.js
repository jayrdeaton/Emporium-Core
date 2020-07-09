const { is, isnt } = require('amprisand'),
  faker = require('faker'),
  Emporium = require('../../'),
  MemoryAdapter = require('@emporium/memory-adapter')
let Storable

describe('beforeStorage', () => {
  describe('setup', () => {
    it('should create a new Emporium and Storable', () => {
      const adapter = new MemoryAdapter()
      adapter.is(Object)
      const emporium = new Emporium(adapter)
      Storable = emporium.define('Test_Model', {
        id: {type: String, default: faker.random.uuid},
        key: String
      }, {
        beforeStorage: (data) => { data.key = faker.random.word() }
      })
    })
  })
  describe('emporium.create', () => {
    it( 'should call hook', async () => {
      object = await Storable.create()
      is(object)
      is(object.key)
      is(typeof object.key === 'string')
    })
  })
  describe('emporium.update', () => {
    it( 'should call hook', async () => {
      const original = object.key
      object = await Storable.update(object)
      is(object)
      is(object.key)
      is(typeof object.key === 'string')
      isnt(object.key === original)
    })
  })
})
