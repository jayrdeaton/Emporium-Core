const { is, isnt } = require('amprisand'),
  uuid = require('uuid'),
  faker = require('faker'),
  Emporium = require('../../'),
  { MemoryAdapter } = Emporium;
let Storable, storables;

describe('MemoryAdapter', () => {
  describe('new MemoryAdapter()', () => {
    it('should create and configure a new Memory Adapter', () => {
      const adapter = new MemoryAdapter();
      adapter.is(Object);
      const emporium = new Emporium(adapter);
      Storable = emporium.define('Test_Model', {
        id: {type: String, default: uuid.v1},
        key: String
      });
      is(Storable);
    });
  });
  describe('Storable.create()', () => {
    it('should create a new storable with default values', async () => {
      const storable = await Storable.create();
      storable.is(Object);
      return;
    });
  });
  describe('Storable.create({})', () => {
    it('should create a new storable with set values', async () => {
      const object = {id: uuid.v1(), key: faker.random.word()};
      const storable = await Storable.create(object);
      storable.is(Object);
      storable.is(object);
      return;
    });
  });
  describe('Storable.create([])', () => {
    it('should create two new storables with set values', async () => {
      const a = {id: uuid.v1(), key: faker.random.word()};
      const b = {id: uuid.v1(), key: faker.random.word()};
      storables = await Storable.create([new Storable(a), new Storable(b)]);
      storables.is(Array);
      storables.length.is(2);
      storables[0].is(a);
      storables[1].is(b);
      return;
    });
  });
  describe('Storable.update({})', () => {
    it('should update a storable', async () => {
      const object = storables[0];
      object.key = faker.random.word();
      storable = await Storable.update(object);
      storable.is(Object);
      storable.is(object);
      return;
    });
  });
  describe('Storable.update([])', () => {
    it('should update two storables', async () => {
      const a = storables[0];
      const b = storables[1];
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
      storables.length.is(4);
      return;
    });
  });
  describe('Storable.get(filter)', () => {
    it('should get a filtered array of three storables', async () => {
      const result = await Storable.get({ filter: {key: storables[1].key} });
      result.is(Array);
      result.length.is(1);
      return;
    });
  });
  describe('Storable.get(sort)', () => {
    it('should get a sorted array of five storables', async () => {
      const result = await Storable.get({ sort: {id:-1} });
      result.is(Array);
      result.length.is(4);
      let previous = result.shift();
      for (const object of result) {
        is(previous.id >= object.id);
        previous = object;
      };
      return;
    });
  });
  describe('Storable.get(limit)', () => {
    it('should get a limited array of one storables', async () => {
      const result = await Storable.get({ limit: 1 });
      result.is(Array);
      result.length.is(1);
      return;
    });
  });
  describe('Storable.get(skip)', () => {
    it('should get a skipped array of four storables', async () => {
      const result = await Storable.get({ skip: 1 });
      result.is(Array);
      result.length.is(3);
      return;
    });
  });
  describe('Storable.get(offset)', () => {
    it('should get an offset array of four storables', async () => {
      const result = await Storable.get({ offset: 1 });
      result.is(Array);
      result.length.is(3);
      return;
    });
  });
  describe('Storable.find({})', () => {
    it('should get a storable', async () => {
      const object = storables[0];
      const storable = await Storable.find(object);
      storable.is(Object);
      storable.is(object);
      return;
    });
  });
  describe('Storable.find(identifier)', () => {
    it('should get a storable', async () => {
      const object = storables[0];
      const storable = await Storable.find(object.id);
      storable.is(Object);
      storable.is(object);
      return;
    });
  });
  describe('Storable.delete({})', () => {
    it('should delete a storable', async () => {
      const object = storables.shift();
      const result = await Storable.delete(object);
      const remaining = await Storable.get();
      isnt(result);
      remaining.is(Array);
      remaining.length.is(3);
      return;
    });
  });
  describe('Storable.delete([])', () => {
    it('should delete two storables', async () => {
      const objects = storables.splice(0, 2);
      const result = await Storable.delete(objects);
      const remaining = await Storable.get();
      isnt(result);
      remaining.is(Array);
      remaining.length.is(1);
      return;
    });
  });
  describe('storable.save()', () => {
    it('should update a storable', async () => {
      const object = storables[0];
      object.key = faker.random.word();
      const storable = await object.save();
      storable.is(Object);
      storable.is(object);
      return;
    });
  });
});
