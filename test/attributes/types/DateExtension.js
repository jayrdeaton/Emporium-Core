const { is, isnt } = require('amprisand'),
  faker = require('faker'),
  Emporium = require('../../../'),
  MemoryAdapter = require('@emporium/memory-adapter')
let adapter, emporiumStorable, storables = []

describe('DateExtension', () => {
  describe('setup', () => {
    it(' should setup emporium', () => {
      adapter = new MemoryAdapter()
      adapter.is(Object)
      emporium = new Emporium(adapter)
      emporium.is(Object)
    })
  })
  describe('define("Test", { key: DateExtension })', () => {
    it('should define a new Storable', () => {
      class DateExtension extends Date {
        constructor(data) {
          super(data)
        }
      }
      Storable = emporium.define('Test_Model', {
        id: {type: String, default: faker.random.uuid},
        key: DateExtension
      })
      is(Storable)
    })
  })
  describe('Storable.create({ key: Array })', () => {
    it('should successfully create a storable with Array', async () => {
      let storable, error, key = [ faker.random.word(), faker.random.word() ]
      try {
        storable = await Storable.create({ key })
      } catch(err) {
        error = err
      }
      isnt(error)
      is(storable)
    })
  })
  describe('Storable.create({ key: Boolean })', () => {
    it('should successfully create a storable with a DateExtension', async () => {
      let storable, error, key = faker.random.boolean()
      try {
        storable = await Storable.create({ key })
      } catch(err) {
        error = err
      }
      isnt(error)
      is(storable)
    })
  })
  describe('Storable.create({ key: DateExtension })', () => {
    it('should successfully create a storable with a Date', async () => {
      let storable, error, key = faker.date.recent()
      try {
        storable = await Storable.create({ key })
      } catch(err) {
        error = err
      }
      isnt(error)
      is(storable)
    })
  })
  describe('Storable.create({ key: Number })', () => {
    it('should successfully create a storable with a Number', async () => {
      let storable, error, key = faker.random.number()
      try {
        storable = await Storable.create({ key })
      } catch(err) {
        error = err
      }
      isnt(error)
      is(storable)
    })
  })
  describe('Storable.create({ key: Object })', () => {
    it('should successfully create a storable with a Object', async () => {
      let storable, error, key = { a: faker.random.word(), b: faker.random.word() }
      try {
        storable = await Storable.create({ key })
      } catch(err) {
        error = err
      }
      isnt(error)
      is(storable)
    })
  })
  describe('Storable.create({ key: String })', () => {
    it('should successfully create a storable with a String', async () => {
      let storable, error, key = faker.random.word()
      try {
        storable = await Storable.create({ key })
      } catch(err) {
        error = err
      }
      isnt(error)
      is(storable)
    })
  })
})
