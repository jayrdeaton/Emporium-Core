let { is, isnt } = require('amprisand'),
  faker = require('faker'),
  Emporium = require('../../../'),
  MemoryAdapter = require('@emporium/memory-adapter')
let adapter, emporiumstorable, Storable, defaultValue, storable

describe('locked', () => {
  describe('setup', () => {
    it(' should setup emporium', () => {
      adapter = new MemoryAdapter()
      adapter.is(Object)
      emporium = new Emporium(adapter)
      emporium.is(Object)
    })
  })
  describe(`define('Test', { key: { type: String, locked: true } })`, () => {
    it('should define a new Storable with a locked key', () => {
      defaultValue = faker.random.word()
      Storable = emporium.define('Test_Model', {
        id: {type: String, default: faker.random.uuid},
        key: {type: String, default: defaultValue, locked: true}
      })
      is(Storable)
      is(Storable.schema.locked.includes('key'))
    })
  })
  describe('Storable.create()', () => {
    it('should create a storable with locked value', async () => {
      let error
      try {
        storable = await Storable.create()
      } catch(err) {
        error = err
      }
      isnt(error)
      is(storable)
      storable.key.is(defaultValue)
      storable.key = faker.random.word()
      storable.key.is(defaultValue)
    })
  })
  describe('Storable.update()', () => {
    it('should not update a storables locked value', async () => {
      let error, result
      try {
        result = await Storable.update(storable)
      } catch(err) {
        error = err
      }
      isnt(error)
      is(storable)
      storable.key.is(defaultValue)
    })
  })
})
