const { is, isnt } = require('amprisand'),
  uuid = require('uuid'),
  faker = require('faker'),
  Emporium = require('../../'),
  { MemoryAdapter } = Emporium;
let emporiumStorable, storables = [];

describe('Emporium', () => {
  describe('new Emporium()', () => {
    it('should create a new Emporium', () => {
      emporium = new Emporium();
      emporium.is(Object);
    });
  });
  describe('emporium.define', () => {
    it('Storable should be available through emporium', () => {
      emporium.define('Storable_Model', { id: {type: String, default:uuid.v1 } });
      is(emporium.models.Storable_Model);
      is(emporium.models.Storable_Model.create);
      is(emporium.models.Storable_Model.delete);
      is(emporium.models.Storable_Model.get);
      is(emporium.models.Storable_Model.update);
      is(emporium.models.Storable_Model.schema)
    });
  });
  describe('emporium[Other]', () => {
    it('Other should not be available through emporium', () => {
      isnt(emporium.Test);
    });
  });
});
