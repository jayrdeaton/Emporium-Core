const { is, isnt } = require('amprisand'),
  { faker } = require('@faker-js/faker'),
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
        id: {type: String, default: faker.datatype.uuid},
        key: String
      }, {
        collectionMethods: {
          first: function() {
            return this[0]
          }
        }
      })
      controller = emporium.controllers.ATestController
      is(controller)
      is(Storable.controller)
      is(controller === Storable.controller)
    })
  })
})
