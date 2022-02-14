const { is, isnt } = require('amprisand'),
  faker = require('faker'),
  Emporium = require('../../'),
  MemoryAdapter = require('@emporium/memory-adapter')
let emporium, Storable, Collection, storableA, storableB, collection

describe('methods', () => {
  describe('setup', () => {
    it('should create a new Emporium and Storable and Collection', () => {
      const adapter = new MemoryAdapter()
      adapter.is(Object)
      emporium = new Emporium(adapter)
      Storable = emporium.define('ATest', {
        id: {type: String, default: faker.random.uuid},
        key: String
      }, {
        collectionMethods: {
          first: function() {
            return this[0]
          }
        }
      })
      Collection = emporium.collections.ATests
      is(Collection)
    })
  })
  describe('Collection', () => {
    it('should behave like array', async () => {
      storableA = await Storable.create()
      storableB = await Storable.create()
      collection = await Storable.get()
      is(collection)
      collection.length.is(2)
      collection[0].id.is(storableA.id)
    })
  })
  describe('collection.method', () => {
    it('should have custom methods', async () => {
      collection.first().id.is(storableA.id)
    })
  })
  describe('collection != collection', () => {
    it('should be unique', async () => {
      emporium.define('BTest', {
        id: {type: String, default: faker.random.uuid},
        key: String
      })
      const collectionB = new emporium.collections.BTests()
      is(collectionB.first === undefined)
      is(collection.first)
    })
  })
  describe('collection.extend', () => {
    it('should extend', async () => {
      emporium.define('CTest', {
        id: {type: String, default: faker.random.uuid},
        key: String
      }, { extends: Storable })
      const collectionC = new emporium.collections.CTests()
      is(typeof collectionC.first === 'function')
      is(collection.first)
    })
  })
})
