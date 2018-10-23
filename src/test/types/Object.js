let { is, isnt } = require('amprisand'),
  uuid = require('uuid'),
  faker = require('faker'),
  Emporium = require('../../../'),
  { MemoryAdapter, Schema } = Emporium,
  schema, Storable, storables = [];

describe('Object', () => {
  describe('new Schema({ key: Object })', () => {
    it('should create a new Schema', () => {
      let adapter = new MemoryAdapter();
      adapter.is(Object);
      let emporium = new Emporium();
      emporium.setAdapter(adapter);
      emporium._adapter.is(adapter);
      emporium.setIdentifier('id');
      emporium._identifier.is('id');
      schema = new Schema({
        id: {type: String, default: uuid.v1},
        key: Object
      });
      Storable = emporium.storable('Test_Model', schema);
      is(Storable);
    });
  });
  describe('Storable.create({ key: Array })', () => {
    it('should successfully create a storable with Array', async () => {
      let storable, error, key = [ faker.random.word(), faker.random.word() ];
      try {
        storable = await Storable.create({ key });
      } catch(err) {
        error = err;
      };
      isnt(error);
      is(storable);
    });
  });
  describe('Storable.create({ key: Boolean })', () => {
    it('should successfully create a storable with a Date', async () => {
      let storable, error, key = faker.random.boolean();
      try {
        storable = await Storable.create({ key });
      } catch(err) {
        error = err;
      };
      isnt(error);
      is(storable);
    });
  });
  describe('Storable.create({ key: Date })', () => {
    it('should successfully create a storable with a Date', async () => {
      let storable, error, key = faker.date.recent();
      try {
        storable = await Storable.create({ key });
      } catch(err) {
        error = err;
      };
      isnt(error);
      is(storable);
    });
  });
  describe('Storable.create({ key: Number })', () => {
    it('should successfully create a storable with a Number', async () => {
      let storable, error, key = faker.random.number();
      try {
        storable = await Storable.create({ key });
      } catch(err) {
        error = err;
      };
      isnt(error);
      is(storable);
    });
  });
  describe('Storable.create({ key: Object })', () => {
    it('should successfully create a storable with a Object', async () => {
      let storable, error, key = { a: faker.random.word(), b: faker.random.word() };
      try {
        storable = await Storable.create({ key });
      } catch(err) {
        error = err;
      };
      isnt(error);
      is(storable);
    });
  });
  describe('Storable.create({ key: String })', () => {
    it('should successfully create a storable with a String', async () => {
      let storable, error, key = faker.random.word();
      try {
        storable = await Storable.create({ key });
      } catch(err) {
        error = err;
      };
      isnt(error);
      is(storable);
    });
  });
});
