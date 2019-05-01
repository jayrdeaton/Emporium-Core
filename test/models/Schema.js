const { is, isnt } = require('amprisand'),
  uuid = require('uuid'),
  faker = require('faker'),
  Emporium = require('../../'),
  { MemoryAdapter,  = Emporium;
let schema;

describe('Schema', () => {
  describe('new Schema()', () => {
    it('should define a new Storable', () => {
      schema = new Schema({ id: {type: String, default: uuid.v1} });
      schema.is(Object);
    });
  });
  describe('new Schema(invalid)', () => {
    it('should fail to create a new Schema', () => {
      let result, error;
      try {
        result = new Schema({ id: {default: uuid.v1} });
      } catch(err) {
        error = err;
      };
      is(error);
      isnt(result);
    });
  });
  describe('schema.setAdapter()', () => {
    it('should set the adapter for this schema', () => {
      const adapter = new MemoryAdapter();
      adapter.is(Object);
      schema.setAdapter(adapter);
      schema.adapter.is(adapter);
    });
  });
  describe('schema.setIdentifier()', () => {
    it('should set the adapter for this schema', () => {
      schema.setIdentifier('uuid');
      schema.identifier.is('uuid');
    });
  });
});
