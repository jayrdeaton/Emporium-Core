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
    it('should define a new storable', () => {
      emporium.define('Storable_Model', { id: {type: String, default:uuid.v1 } });
      is(emporium.models.Storable_Model);
      is(emporium.models.Storable_Model.create);
      is(emporium.models.Storable_Model.delete);
      is(emporium.models.Storable_Model.get);
      is(emporium.models.Storable_Model.update);
      is(emporium.models.Storable_Model.schema)
    });
  });
  describe('emporium.define(options)', () => {
    it('should define a new storable with options', () => {
      emporium.define('Storable_Model', { id: {type: String, default:uuid.v1 } }, {
        afterDefine: () => { console.log('afterDefine') },
        beforeDefine: () => { console.log('beforeDefine') },
        afterStorage: () => { console.log('afterStorage') },
        beforeStorage: () => { console.log('beforeStorage') },
      });
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
