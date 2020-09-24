const { is, isnt } = require('amprisand'),
  faker = require('faker'),
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
        id: {type: String, default: faker.random.uuid},
        key: String
      }, {
        methods: {
          method: (i) => { return i }
        }
      })
    })
  })
  describe('storable.method()', () => {
    it('should have instance method', async () => {
      const storable = new Storable()
      is(storable.method)
      const s = faker.random.uuid()
      const result = storable.method(s)
      is(result)
      result.is(s)
    })
  })
})
