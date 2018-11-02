let { is, isnt } = require('amprisand'),
  uuid = require('uuid'),
  faker = require('faker'),
  Emporium = require('../../../'),
  { MemoryAdapter, Schema } = Emporium,
  schema, Storable, defaultValue, storables = [];

describe('default', () => {
  describe('Array', () => {
    describe(`new Schema({ key: { type: Array, default: value } })`, () => {
      it('should create a new Schema with a default for key', () => {
        let adapter = new MemoryAdapter();
        adapter.is(Object);
        let emporium = new Emporium();
        emporium.setAdapter(adapter);
        emporium._adapter.is(adapter);
        emporium.setIdentifier('id');
        emporium._identifier.is('id');
        defaultValue = [ faker.random.word() ];
        schema = new Schema({
          id: {type: String, default: uuid.v1},
          key: {type: Array, default: defaultValue}
        });
        Storable = emporium.storable('Test_Model', schema);
        is(Storable);
      });
    });
    describe('Storable.create()', () => {
      it('should create a storable with default value', async () => {
        let storable, error;
        try {
          storable = await Storable.create();
        } catch(err) {
          error = err;
        };
        isnt(error);
        is(storable);
        storable.key.is(defaultValue);
      });
    });
    describe('Storable.create({})', () => {
      it('should create a storable with input value', async () => {
        let storable, error, key = [ faker.random.word() ];
        try {
          storable = await Storable.create({ key });
        } catch(err) {
          error = err;
        };
        isnt(error);
        is(storable);
        storable.key.is(key);
      });
    });
  });
  describe('Boolean', () => {
    describe(`new Schema({ key: { type: Boolean, default: value } })`, () => {
      it('should create a new Schema with a default for key', () => {
        let adapter = new MemoryAdapter();
        adapter.is(Object);
        let emporium = new Emporium();
        emporium.setAdapter(adapter);
        emporium._adapter.is(adapter);
        emporium.setIdentifier('id');
        emporium._identifier.is('id');
        defaultValue = faker.random.boolean();
        schema = new Schema({
          id: {type: String, default: uuid.v1},
          key: {type: Boolean, default: defaultValue}
        });
        Storable = emporium.storable('Test_Model', schema);
        is(Storable);
      });
    });
    describe('Storable.create()', () => {
      it('should create a storable with default value', async () => {
        let storable, error;
        try {
          storable = await Storable.create();
        } catch(err) {
          error = err;
        };
        isnt(error);
        is(storable);
        storable.key.is(defaultValue);
      });
    });
    describe('Storable.create({})', () => {
      it('should create a storable with input value', async () => {
        let storable, error, key = faker.random.boolean();
        try {
          storable = await Storable.create({ key });
        } catch(err) {
          error = err;
        };
        isnt(error);
        is(storable);
        storable.key.is(key);
      });
    });
  });
  describe('Date', () => {
    describe(`new Schema({ key: { type: Date, default: value } })`, () => {
      it('should create a new Schema with a default for key', () => {
        let adapter = new MemoryAdapter();
        adapter.is(Object);
        let emporium = new Emporium();
        emporium.setAdapter(adapter);
        emporium._adapter.is(adapter);
        emporium.setIdentifier('id');
        emporium._identifier.is('id');
        defaultValue = faker.date.recent();
        schema = new Schema({
          id: {type: String, default: uuid.v1},
          key: {type: Date, default: defaultValue}
        });
        Storable = emporium.storable('Test_Model', schema);
        is(Storable);
      });
    });
    describe('Storable.create()', () => {
      it('should create a storable with default value', async () => {
        let storable, error;
        try {
          storable = await Storable.create();
        } catch(err) {
          error = err;
        };
        isnt(error);
        is(storable);
        storable.key.is(defaultValue);
      });
    });
    describe('Storable.create({})', () => {
      it('should create a storable with input value', async () => {
        let storable, error, key = faker.date.recent();
        try {
          storable = await Storable.create({ key });
        } catch(err) {
          error = err;
        };
        isnt(error);
        is(storable);
        storable.key.is(key);
      });
    });
  });
  describe('Number', () => {
    describe(`new Schema({ key: { type: Number, default: value } })`, () => {
      it('should create a new Schema with a default for key', () => {
        let adapter = new MemoryAdapter();
        adapter.is(Object);
        let emporium = new Emporium();
        emporium.setAdapter(adapter);
        emporium._adapter.is(adapter);
        emporium.setIdentifier('id');
        emporium._identifier.is('id');
        defaultValue = faker.random.number();
        schema = new Schema({
          id: {type: String, default: uuid.v1},
          key: {type: Number, default: defaultValue}
        });
        Storable = emporium.storable('Test_Model', schema);
        is(Storable);
      });
    });
    describe('Storable.create()', () => {
      it('should create a storable with default value', async () => {
        let storable, error;
        try {
          storable = await Storable.create();
        } catch(err) {
          error = err;
        };
        isnt(error);
        is(storable);
        storable.key.is(defaultValue);
      });
    });
    describe('Storable.create({})', () => {
      it('should create a storable with input value', async () => {
        let storable, error, key = faker.random.number();
        try {
          storable = await Storable.create({ key });
        } catch(err) {
          error = err;
        };
        isnt(error);
        is(storable);
        storable.key.is(key);
      });
    });
  });
  describe('Object', () => {
    describe(`new Schema({ key: { type: Object, default: value } })`, () => {
      it('should create a new Schema with a default for key', () => {
        let adapter = new MemoryAdapter();
        adapter.is(Object);
        let emporium = new Emporium();
        emporium.setAdapter(adapter);
        emporium._adapter.is(adapter);
        emporium.setIdentifier('id');
        emporium._identifier.is('id');
        defaultValue = { key: faker.random.word() };
        schema = new Schema({
          id: {type: String, default: uuid.v1},
          key: {type: Object, default: defaultValue}
        });
        Storable = emporium.storable('Test_Model', schema);
        is(Storable);
      });
    });
    describe('Storable.create()', () => {
      it('should create a storable with default value', async () => {
        let storable, error;
        try {
          storable = await Storable.create();
        } catch(err) {
          error = err;
        };
        isnt(error);
        is(storable);
        storable.key.is(defaultValue);
      });
    });
    describe('Storable.create({})', () => {
      it('should create a storable with input value', async () => {
        let storable, error, key = { key: faker.random.word() };
        try {
          storable = await Storable.create({ key });
        } catch(err) {
          error = err;
        };
        isnt(error);
        is(storable);
        storable.key.is(key);
      });
    });
  });
  describe('String', () => {
    describe(`new Schema({ key: { type: String, default: value } })`, () => {
      it('should create a new Schema with a default for key', () => {
        let adapter = new MemoryAdapter();
        adapter.is(Object);
        let emporium = new Emporium();
        emporium.setAdapter(adapter);
        emporium._adapter.is(adapter);
        emporium.setIdentifier('id');
        emporium._identifier.is('id');
        defaultValue = faker.random.word();
        schema = new Schema({
          id: {type: String, default: uuid.v1},
          key: {type: String, default: defaultValue}
        });
        Storable = emporium.storable('Test_Model', schema);
        is(Storable);
      });
    });
    describe('Storable.create()', () => {
      it('should create a storable with default value', async () => {
        let storable, error;
        try {
          storable = await Storable.create();
        } catch(err) {
          error = err;
        };
        isnt(error);
        is(storable);
        storable.key.is(defaultValue);
      });
    });
    describe('Storable.create({})', () => {
      it('should create a storable with input value', async () => {
        let storable, error, key = faker.random.word();
        try {
          storable = await Storable.create({ key });
        } catch(err) {
          error = err;
        };
        isnt(error);
        is(storable);
        storable.key.is(key);
      });
    });
  });
  describe('null', () => {
    describe(`new Schema({ key: { type: String, default: null } })`, () => {
      it('should create a new Schema with a default for key', () => {
        let adapter = new MemoryAdapter();
        adapter.is(Object);
        let emporium = new Emporium();
        emporium.setAdapter(adapter);
        emporium._adapter.is(adapter);
        emporium.setIdentifier('id');
        emporium._identifier.is('id');
        defaultValue = null;
        schema = new Schema({
          id: {type: String, default: uuid.v1},
          key: {type: String, default: defaultValue}
        });
        Storable = emporium.storable('Test_Model', schema);
        is(Storable);
      });
    });
    describe('Storable.create()', () => {
      it('should create a storable with default value', async () => {
        let storable, error;
        try {
          storable = await Storable.create();
        } catch(err) {
          error = err;
        };
        isnt(error);
        is(storable);
        is(storable.key === defaultValue);
      });
    });
    describe('Storable.create({})', () => {
      it('should create a storable with input value', async () => {
        let storable, error, key = faker.random.word();
        try {
          storable = await Storable.create({ key });
        } catch(err) {
          error = err;
        };
        isnt(error);
        is(storable);
        storable.key.is(key);
      });
    });
  });
});
