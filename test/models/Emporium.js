let { is, isnt } = require('amprisand'),
  uuid = require('uuid'),
  faker = require('faker'),
  Emporium = require('../../'),
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
  describe('emporium.storable', () => {
    it('Storable should be available through emporium', () => {
      let schema = new Schema({ id: {type: String, default:uuid.v1 } });
      emporium.storable('Storable_Model', schema);
      is(emporium['Storable_Model']);
      is(emporium['Storable_Model'].create);
      is(emporium['Storable_Model'].delete);
      is(emporium['Storable_Model'].get);
      is(emporium['Storable_Model'].update);
    });
  });
  describe('emporium.readable', () => {
    it('Readable should be available through emporium', () => {
      let schema = new Schema({ id: {type: String, default:uuid.v1 } });
      emporium.readable('Readable_Model', schema);
      is(emporium['Readable_Model']);
      isnt(emporium['Readable_Model'].create);
      isnt(emporium['Readable_Model'].delete);
      is(emporium['Readable_Model'].get);
      isnt(emporium['Readable_Model'].update);
    });
  });
  describe('emporium[Other]', () => {
    it('Other should not be available through emporium', () => {
      isnt(emporium['Test']);
    });
  });
});
