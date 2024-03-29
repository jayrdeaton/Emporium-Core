const { is, isnt } = require('amprisand'),
  { faker } = require('@faker-js/faker'),
  Emporium = require('../../../'),
  MemoryAdapter = require('@emporium/memory-adapter')
let adapter, emporium , Storable, defaultValue, storables = []

describe('discarded', () => {
  describe('setup', () => {
    it(' should setup emporium', () => {
      adapter = new MemoryAdapter()
      adapter.is(Object)
      emporium = new Emporium(adapter)
      emporium.is(Object)
    })
  })
  describe(`define('Test', { key: { type: String, discarded: true } })`, () => {
    it('should define a new Storable with a discarded key', () => {
      defaultValue = faker.random.word()
      Storable = emporium.define('Test', {
        id: {type: String, default: faker.datatype.uuid},
        key: {type: String, default: defaultValue, discarded: true}
      })
      Storable.schema.discarded.includes('key').is()
      is(Storable)
    })
  })
  describe('Storable.create()', () => {
    it('should create a storable with discarded value', async () => {
      let storable, error
      try {
        storable = await Storable.create()
      } catch(err) {
        error = err
      }
      isnt(error)
      is(storable)
      storable.key.is(defaultValue)
    })
  })
  describe('Storable.create()', () => {
    it('should create a storable with discarded value', async () => {
      let storable, error
      try {
        storable = await Storable.create()
      } catch(err) {
        error = err
      }
      isnt(error)
      is(storable)
      storable.key.is(defaultValue)
    })
  })
})
