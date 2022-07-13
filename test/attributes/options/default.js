const { is, isnt } = require('amprisand'),
  { faker } = require('@faker-js/faker'),
  Emporium = require('../../../'),
  MemoryAdapter = require('@emporium/memory-adapter')
let adapter, emporium, Storable, defaultValue, storables = []

describe('default', () => {
  describe('setup', () => {
    it(' should setup emporium', () => {
      adapter = new MemoryAdapter()
      adapter.is(Object)
      emporium = new Emporium(adapter)
      emporium.is(Object)
    })
  })
  describe('Array', () => {
    describe(`define('Test', { key: { type: Array, default: value } })`, () => {
      it('should define a new Storable with a default for key', () => {
        defaultValue = [ faker.random.word() ]
        Storable = emporium.define('Test_Model', {
          id: {type: String, default: faker.datatype.uuid},
          key: {type: Array, default: defaultValue}
        })
        is(Storable)
      })
    })
    describe('Storable.create()', () => {
      it('should create a storable with default value', async () => {
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
    describe('Storable.create({})', () => {
      it('should create a storable with input value', async () => {
        const key = [ faker.random.word() ]
        let storable, error
        try {
          storable = await Storable.create({ key })
        } catch(err) {
          error = err
        }
        isnt(error)
        is(storable)
        storable.key.is(key)
      })
    })
  })
  describe('Boolean', () => {
    describe(`define('Test', { key: { type: Boolean, default: value } })`, () => {
      it('should define a new Storable with a default for key', () => {
        defaultValue = faker.datatype.boolean()
        Storable = emporium.define('Test_Model', {
          id: {type: String, default: faker.datatype.uuid},
          key: {type: Boolean, default: defaultValue}
        })
        is(Storable)
      })
    })
    describe('Storable.create()', () => {
      it('should create a storable with default value', async () => {
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
    describe('Storable.create({})', () => {
      it('should create a storable with input value', async () => {
        let storable, error, key = faker.datatype.boolean()
        try {
          storable = await Storable.create({ key })
        } catch(err) {
          error = err
        }
        isnt(error)
        is(storable)
        storable.key.is(key)
      })
    })
  })
  describe('Date', () => {
    describe(`define('Test', { key: { type: Date, default: value } })`, () => {
      it('should define a new Storable with a default for key', () => {
        defaultValue = faker.date.recent()
        Storable = emporium.define('Test_Model', {
          id: {type: String, default: faker.datatype.uuid},
          key: {type: Date, default: defaultValue}
        })
        is(Storable)
      })
    })
    describe('Storable.create()', () => {
      it('should create a storable with default value', async () => {
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
    describe('Storable.create({})', () => {
      it('should create a storable with input value', async () => {
        let storable, error, key = faker.date.recent()
        try {
          storable = await Storable.create({ key })
        } catch(err) {
          error = err
        }
        isnt(error)
        is(storable)
        storable.key.is(key)
      })
    })
  })
  describe('Number', () => {
    describe(`define('Test', { key: { type: Number, default: value } })`, () => {
      it('should define a new Storable with a default for key', () => {
        defaultValue = faker.datatype.number()
        Storable = emporium.define('Test_Model', {
          id: {type: String, default: faker.datatype.uuid},
          key: {type: Number, default: defaultValue}
        })
        is(Storable)
      })
    })
    describe('Storable.create()', () => {
      it('should create a storable with default value', async () => {
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
    describe('Storable.create({})', () => {
      it('should create a storable with input value', async () => {
        let storable, error, key = faker.datatype.number()
        try {
          storable = await Storable.create({ key })
        } catch(err) {
          error = err
        }
        isnt(error)
        is(storable)
        storable.key.is(key)
      })
    })
  })
  describe('Object', () => {
    describe(`define('Test', { key: { type: Object, default: value } })`, () => {
      it('should define a new Storable with a default for key', () => {
        defaultValue = { key: faker.random.word() }
        Storable = emporium.define('Test_Model', {
          id: {type: String, default: faker.datatype.uuid},
          key: {type: Object, default: defaultValue}
        })
        is(Storable)
      })
    })
    describe('Storable.create()', () => {
      it('should create a storable with default value', async () => {
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
    describe('Storable.create({})', () => {
      it('should create a storable with input value', async () => {
        let storable, error, key = { key: faker.random.word() }
        try {
          storable = await Storable.create({ key })
        } catch(err) {
          error = err
        }
        isnt(error)
        is(storable)
        storable.key.is(key)
      })
    })
  })
  describe('String', () => {
    describe(`define('Test', { key: { type: String, default: value } })`, () => {
      it('should define a new Storable with a default for key', () => {
        defaultValue = faker.random.word()
        Storable = emporium.define('Test_Model', {
          id: {type: String, default: faker.datatype.uuid},
          key: {type: String, default: defaultValue}
        })
        is(Storable)
      })
    })
    describe('Storable.create()', () => {
      it('should create a storable with default value', async () => {
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
    describe('Storable.create({})', () => {
      it('should create a storable with input value', async () => {
        let storable, error, key = faker.random.word()
        try {
          storable = await Storable.create({ key })
        } catch(err) {
          error = err
        }
        isnt(error)
        is(storable)
        storable.key.is(key)
      })
    })
  })
  describe('null', () => {
    describe(`define('Test', { key: { type: String, default: null } })`, () => {
      it('should define a new Storable with a default for key', () => {
        defaultValue = null
        Storable = emporium.define('Test_Model', {
          id: {type: String, default: faker.datatype.uuid},
          key: {type: String, default: defaultValue}
        })
        is(Storable)
      })
    })
    describe('Storable.create()', () => {
      it('should create a storable with default value', async () => {
        let storable, error
        try {
          storable = await Storable.create()
        } catch(err) {
          error = err
        }
        isnt(error)
        is(storable)
        is(storable.key === defaultValue)
      })
    })
    describe('Storable.create({})', () => {
      it('should create a storable with input value', async () => {
        let storable, error, key = faker.random.word()
        try {
          storable = await Storable.create({ key })
        } catch(err) {
          error = err
        }
        isnt(error)
        is(storable)
        storable.key.is(key)
      })
    })
  })
})
