const { is, isnt } = require('amprisand'),
  faker = require('faker'),
  Emporium = require('../../'),
  emporium = new Emporium()
let Storable

describe('extends', () => {
  describe('extends: Storable', () => {
    it('should create a Storable that extends another', () => {
      const Base = emporium.define('Base', {
        id: {type: String, default: faker.random.uuid},
        key: {type: String, default: faker.random.word}
      })
      Storable = emporium.define('Storable', null, {
        extends: Base
      })
      is(Storable.schema.extends)
      is(typeof Storable.schema.extends === 'function')
    })
  })
  describe('new Storable', () => {
    it( 'should extend Storable', async () => {
      const result = new Storable()
      is(result)
      is(result.id)
      is(result.key)
    })
  })
  describe('extends: string', () => {
    it('should create a Storable that extends another', () => {
      const Base = emporium.define('Base', {
        id: {type: String, default: faker.random.uuid},
        key: {type: String, default: faker.random.word}
      })
      Storable = emporium.define('Storable', null, {
        extends: 'Base'
      })
      is(Storable.schema.extends)
      is(typeof Storable.schema.extends === 'string')
    })
  })
  describe('new Storable', () => {
    it( 'should extend Storable', async () => {
      const result = new Storable()
      is(result)
      is(result.id)
      is(result.key)
    })
  })
  describe('extends: Storable', () => {
    it('should create a Storable that extends another', () => {
      Storable = emporium.define('Storable', null, {
        extends: (data) => {
          return { id: faker.random.uuid(), key: faker.random.word() }
        }
      })
      is(Storable.schema.extends)
      is(typeof Storable.schema.extends === 'function')
    })
  })
  describe('new Storable', () => {
    it( 'should extend Storable', async () => {
      const result = new Storable()
      is(result)
      is(result.id)
      is(result.key)
    })
  })
})
