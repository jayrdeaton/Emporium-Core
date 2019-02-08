let { is, isnt } = require('amprisand'),
  uuid = require('uuid'),
  faker = require('faker'),
  Emporium = require('../../'),
  { MemoryAdapter, Schema } = Emporium,
  schema, Storable, storables;

describe('MemoryAdapter', () => {
  describe('new MemoryAdapter()', () => {
    it('should create and configure a new Memory Adapter', () => {
      let adapter = new MemoryAdapter();
      adapter.is(Object);
      let emporium = new Emporium();
      emporium.setAdapter(adapter);
      emporium._adapter.is(adapter);
      emporium.setIdentifier('id');
      emporium._identifier.is('id');
      schema = new Schema({
        id: {type: String, default: uuid.v1},
        key: String
      });
      Storable = emporium.storable('Test_Model', schema);
      is(Storable);
    });
  });
  describe('Storable.create()', () => {
    it('should create a new storable with default values', async () => {
      let storable = await Storable.create();
      storable.is(Object);
      return;
    });
  });
  describe('Storable.create({})', () => {
    it('should create a new storable with set values', async () => {
      let object = {id: uuid.v1(), key: faker.random.word()};
      let storable = await Storable.create(object);
      storable.is(Object);
      storable.is(object);
      return;
    });
  });
  describe('Storable.create([])', () => {
    it('should create two new storables with set values', async () => {
      let a = {id: uuid.v1(), key: faker.random.word()};
      let b = {id: uuid.v1(), key: faker.random.word()};
      storables = await Storable.create([new Storable(a), new Storable(b)]);
      storables.is(Array);
      storables.length.is(2);
      storables[0].is(a);
      storables[1].is(b);
      return;
    });
  });
  describe('Storable.batch()', () => {
    it('should update a batch of storables', async () => {
      let result = await Storable.batch({ key: faker.random.word() });
      result.is();
      return;
    });
  });
  describe('Storable.count()', () => {
    it('should count how many storables', async () => {
      let result = await Storable.count();
      result.is(Number);
      return;
    });
  });
  describe('Storable.duplicate()', () => {
    it('should duplicate a given storable', async () => {
      let result = await Storable.duplicate(storables[1].id);
      result.is(Object);
      return;
    });
  });
  describe('Storable.update({})', () => {
    it('should update a storable', async () => {
      let object = storables[0];
      object.key = faker.random.word();
      storable = await Storable.update(object);
      storable.is(Object);
      storable.is(object);
      return;
    });
  });
  describe('Storable.update([])', () => {
    it('should update two storables', async () => {
      let a = storables[0];
      let b = storables[1];
      a.key = faker.random.word();
      b.key = faker.random.word();
      storables = await Storable.update([a, b]);
      storables.is(Array);
      storables[0].is(a);
      storables[1].is(b);
      return;
    });
  });
  describe('Storable.get()', () => {
    it('should get an array of five storables', async () => {
      storables = await Storable.get();
      storables.is(Array);
      storables.length.is(5);
      return;
    });
  });
  describe('Storable.get(filter)', () => {
    it('should get a filtered array of three storables', async () => {
      let result = await Storable.get({ filter: {key: storables[1].key} });
      result.is(Array);
      result.length.is(3);
      return;
    });
  });
  describe('Storable.get(sort)', () => {
    it('should get a sorted array of five storables', async () => {
      let result = await Storable.get({ sort: {id:-1} });
      result.is(Array);
      result.length.is(5);
      let previous = result.shift();
      for (let object of result) {
        is(previous.id >= object.id);
        previous = object;
      };
      return;
    });
  });
  describe('Storable.get(limit)', () => {
    it('should get a limited array of one storables', async () => {
      let result = await Storable.get({ limit: 1 });
      result.is(Array);
      result.length.is(1);
      return;
    });
  });
  describe('Storable.get(skip)', () => {
    it('should get a skipped array of four storables', async () => {
      let result = await Storable.get({ skip: 1 });
      result.is(Array);
      result.length.is(4);
      return;
    });
  });
  describe('Storable.get(offset)', () => {
    it('should get an offset array of four storables', async () => {
      let result = await Storable.get({ offset: 1 });
      result.is(Array);
      result.length.is(4);
      return;
    });
  });
  describe('Storable.find({})', () => {
    it('should get a storable', async () => {
      let object = storables[0];
      let storable = await Storable.find(object);
      storable.is(Object);
      storable.is(object);
      return;
    });
  });
  describe('Storable.find(identifier)', () => {
    it('should get a storable', async () => {
      let object = storables[0];
      let storable = await Storable.find(object.id);
      storable.is(Object);
      storable.is(object);
      return;
    });
  });
  describe('Storable.delete({})', () => {
    it('should delete a storable', async () => {
      let object = storables.shift();
      let result = await Storable.delete(object);
      let remaining = await Storable.get();
      isnt(result);
      remaining.is(Array);
      remaining.length.is(4);
      return;
    });
  });
  describe('Storable.delete([])', () => {
    it('should delete two storables', async () => {
      let objects = storables.splice(0, 2);
      let result = await Storable.delete(objects);
      let remaining = await Storable.get();
      isnt(result);
      remaining.is(Array);
      remaining.length.is(2);
      return;
    });
  });
  describe('storable.save()', () => {
    it('should update a storable', async () => {
      let object = storables[0];
      object.key = faker.random.word();
      let storable = await object.save();
      storable.is(Object);
      storable.is(object);
      return;
    });
  });
});
