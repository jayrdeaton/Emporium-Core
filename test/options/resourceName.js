const { is, isnt } = require('amprisand'),
  faker = require('faker'),
  Emporium = require('../../'),
  emporium = new Emporium()

describe('resourceName', () => {
  describe('resourceName: null', () => {
    it('should create a Schema with a default resourceName', () => {
      const Storable = emporium.define('Test_Storable')
      Storable.schema.resourceName.is('test_storables')
    })
  })
  describe('resourceName: tests', () => {
    it('should create a Schema with a custom resourceName', () => {
      const Storable = emporium.define('Test_Storable', null, { resourceName: 'tests' })
      Storable.schema.resourceName.is('tests')
    })
  })
})
