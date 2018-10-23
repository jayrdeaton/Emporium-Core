let { is, isnt } = require('amprisand'),
  uuid = require('uuid'),
  faker = require('faker'),
  Emporium = require('../../../'),
  { MemoryAdapter, Schema } = Emporium,
  emporium, schema, Storable, storables = [];

describe('Emporium', () => {
  describe('new Emporium()', () => {
    it('should create a new Emporium', () => {
      emporium = new Emporium();
      emporium.is(Object);
    });
  });
  describe('emporium.setAdapter()', () => {
    it('should set the adapter for this emporium', () => {
      let adapter = new MemoryAdapter();
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
  describe('emporium.storables[Storable]', () => {
    it('Storable should be available through emporium', () => {
      let schema = new Schema({ id: {type: String, default:uuid.v1 } });
      emporium.storable('Test_Model', schema);
      is(emporium['Test_Model']);
    });
  });
  describe('emporium.storables[Other]', () => {
    it('Other should not be available through emporium', () => {
      isnt(emporium['Test']);
    });
  });
});
