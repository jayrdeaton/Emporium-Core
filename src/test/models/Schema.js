let { is, isnt } = require('amprisand'),
  uuid = require('uuid'),
  faker = require('faker'),
  Emporium = require('../../../'),
  { MemoryAdapter, Schema } = Emporium,
  schema;

describe('Schema', () => {
  describe('new Schema()', () => {
    it('should create a new Schema', () => {
      schema = new Schema({ id: {type: String, default: uuid.v1} });
      schema.hide('hidden').lock('locked').require('required');
      schema.is(Object);
    });
  });
  describe('schema.setAdapter()', () => {
    it('should set the adapter for this schema', () => {
      let adapter = new MemoryAdapter();
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
