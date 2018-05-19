let { is, isnt } = require('amprisand'),
  uuid = require('uuid'),
  faker = require('faker'),
  Emporium = require('../../'),
  { JSONAdapter, Schema } = Emporium,
  emporium, adapter, schema, Storable, storables;

let fakeObject = () => {
  return {
    uuid: uuid.v1(),

    array: [faker.random.word()],
    boolean: faker.random.boolean(),
    date: Date.now(),
    number: faker.random.number(),
    object: {test: faker.random.word()},
    string: faker.random.word(),

    hidden: faker.random.word(),
    locked: faker.random.word()
  };
};

describe('JSON', () => {
  describe('new Emporium()', () => {
    it('should create a new Emporium', () => {
      emporium = new Emporium();
      emporium.is(Object);
    });
  });
  describe('new JSONAdapter()', () => {
    it('should create and configure a new JSON Adapter', () => {
      adapter = new JSONAdapter({
        name: 'TESTY',
        pretty: false
      });
      adapter.is(Object);
    });
  });
  describe('emporium.setAdapter()', () => {
    it('should set the adapter for this emporium', () => {
      emporium.setAdapter(adapter);
      emporium._adapter.is(adapter);
    });
  });
  describe('emporium.setIdentifier()', () => {
    it('should set the identifier for this emporium', () => {
      emporium.setIdentifier('id');
      emporium._identifier.is('id');
    });
  });
  describe('new Schema()', () => {
    it('should create a new Schema', () => {
      schema = new Schema({
        uuid: {type: String, default: uuid.v1},

        array: {type: Array, default: []},
        boolean: {type: Boolean, default: false},
        date: {type: Number, default: Date.now},
        number: {type: Number, default: 0},
        object: {type: Object, default: {}},
        string: {type: String, default: null},

        hidden: {type: String, default: null},
        locked: {type: String, default: null}
      });
      schema.hide('hidden').lock('locked');
      schema.is(Object);
    });
  });
  describe('emporium.storable()', () => {
    it('should create a new Storable', () => {
      Storable = emporium.storable('JSON_Test_Model', schema);
      is(Storable);
      schema.adapter.is(adapter);
      schema.identifier.is('id');
    });
  });
  describe('emporium.storables[Storable]', () => {
    it('Storable should be available through emporium', () => {
      is(emporium['JSON_Test_Model']);
    });
  });
  describe('emporium.storables[Other]', () => {
    it('Other should not be available through emporium', () => {
      isnt(emporium['Test']);
    });
  });
  describe('schema.setAdapter()', () => {
    it('should set the adapter for this schema', () => {
      adapter = new JSONAdapter({
        name: 'TEST',
        pretty: true
      });
      adapter.is(Object);
      schema.setAdapter(adapter);
      schema.adapter.is(adapter);
      emporium._adapter.isnt(adapter);
    });
  });
  describe('schema.setIdentifier()', () => {
    it('should set the adapter for this schema', () => {
      schema.setIdentifier('uuid');
      schema.identifier.is('uuid');
      emporium._identifier.isnt('uuid');
    });
  });
  describe('schema.setResourceName()', () => {
    it('should set the resourceName for this schema', () => {
      schema.setResourceName('api_test_models');
      schema.resourceName.is('api_test_models');
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
      let object = fakeObject();
      let storable = await Storable.create(object);
      storable.is(Object);
      storable.is(object);
      return;
    });
  });
  describe('Storable.create([])', () => {
    it('should create two new storables with set values', async () => {
      let a = fakeObject();
      let b = fakeObject();
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
      let object = storables[0];
      object.number = faker.random.number();
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
      a.number = faker.random.number();
      b.number = faker.random.number();
      storables = await Storable.update([a, b]);
      storables.is(Array);
      storables[0].is(a);
      storables[1].is(b);
      return;
    });
  });
  describe('Storable.get()', () => {
    it('should get an array of four storables', async () => {
      storables = await Storable.get();
      storables.is(Array);
      storables.length.is(4);
      return;
    });
  });
  describe('Storable.get(filter)', () => {
    it('should get a filtered array of one storables', async () => {
      let result = await Storable.get({ filter: {string: storables[1].string} });
      result.is(Array);
      result.length.is(1);
      return;
    });
  });
  describe('Storable.get(sort)', () => {
    it('should get a sorted array of four storables', async () => {
      let result = await Storable.get({ sort: {date:-1} });
      result.is(Array);
      result.length.is(4);
      let previous = result.shift();
      for (let object of result) {
        is(previous.date >= object.date);
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
    it('should get a skipped array of three storables', async () => {
      let result = await Storable.get({ skip: 1 });
      result.is(Array);
      result.length.is(3);
      return;
    });
  });
  describe('Storable.get(offset)', () => {
    it('should get an offset array of three storables', async () => {
      let result = await Storable.get({ offset: 1 });
      result.is(Array);
      result.length.is(3);
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
      let storable = await Storable.find(object.uuid);
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
      remaining.length.is(3);
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
      remaining.length.is(1);
      return;
    });
  });
  describe('storable.save()', () => {
    it('should update a storable', async () => {
      let object = storables[0];
      object.number = faker.random.number();
      let storable = await object.save();
      storable.is(Object);
      storable.is(object);
      return;
    });
  });
  // describe('storable.delete()', () => {
  //   it('should delete a storable', async () => {
  //     let object = storables[0];
  //     let result = await object.delete();
  //     let remaining = await Storable.get();
  //     isnt(result);
  //     remaining.is(Array);
  //     remaining.length.is(0);
  //     return;
  //   });
  // });
});
