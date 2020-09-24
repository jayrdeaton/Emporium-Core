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
      }, {
        methods: {
          method: (s) => s
        },
        staticMethods: {
          method: (s) => s
        }
      })
      Storable = emporium.define('Storable', null, {
        extends: Base
      })
      is(Storable.schema.extends)
    })
  })
  describe('new Storable', () => {
    it('should extend Storable', async () => {
      const result = new Storable()
      is(result)
      is(result.id)
      is(result.key)
    })
  })
  describe('extends: string', () => {
    it('should create a Storable that extends another', () => {
      Storable = emporium.define('Storable', null, {
        extends: 'Base'
      })
      is(Storable.schema.extends)
    })
  })
  describe('new Storable', () => {
    it('should extend Storable', async () => {
      const result = new Storable()
      is(result)
      is(result.id)
      is(result.key)
    })
  })
  describe('new Storable', () => {
    it('should extend Storable', async () => {
      const result = new Storable()
      is(result)
      is(result.id)
      is(result.key)
    })
  })
  describe('storable.method', () => {
    it('extended storables should have instance methods', () => {
      const storable = new Storable()
      is(storable.method)
    })
  })
  describe('Storable.method', () => {
    it('extended storables should have static methods', async () => {
      is(Storable.method)
    })
  })
})
