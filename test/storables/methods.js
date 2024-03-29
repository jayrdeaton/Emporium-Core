const { is, isnt } = require('amprisand'),
  { faker } = require('@faker-js/faker'),
  Emporium = require('../../'),
  MemoryAdapter = require('@emporium/memory-adapter')
let Storable

describe('methods', () => {
  describe('setup', () => {
    it('should create a new Emporium and Storable with a method', () => {
      const adapter = new MemoryAdapter()
      adapter.is(Object)
      const emporium = new Emporium(adapter)
      Storable = emporium.define('Test_Model', {
        id: {type: String, default: faker.datatype.uuid},
        key: String
      }, {
        methods: {
          methodA: (i) => i,
          methodB: function() { return this }
        }
      })
    })
  })
  describe('storable.methodA()', () => {
    it('should have instance method', async () => {
      const storable = new Storable()
      is(storable.methodA)
      const s = faker.datatype.uuid()
      const result = storable.methodA(s)
      is(result)
      result.is(s)
    })
  })
  describe('storable.methodB()', () => {
    it('instance method should be bound', async () => {
      const storable = new Storable()
      is(storable.methodB)
      const result = storable.methodB()
      is(result)
      result.id.is()
      result.id.is(storable.id)
    })
  })
})
