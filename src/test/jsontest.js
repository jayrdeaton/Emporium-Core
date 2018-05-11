let { adapters, Emporium, Schema } = require('./'),
  uuid = require('uuid');

let test = async () => {
  let emporium = new Emporium();

  let JSONAdapter = adapters.json;

  let adapter = new JSONAdapter({name: 'TEST', pretty: true});

  let schema = new Schema({
    // Base
    created_at: {type: Number, default: Date.now},
    updated_at: {type: Number, default: Date.now},
    uuid: {type: String, default: uuid.v1},
    // Bundle
    amount: {type: Number, default: 0},
    color: {type: Object, default: {alpha: 0, red: 0, green: 0, blue: 0}},
    identifier: {type: String, default: null},
    index: {type: Number, default: 0},
    info: {type: String, default: null},
    name: {type: String, default: null},
    // name: String,
    rank: {type: Number, default: 0},
    // Relationships
    catalog: {type: String, default: null}
  });

  schema.identifier = 'uuid';
  schema.hide('name');
  schema.setAdapter(adapter);

  let Bundle = emporium.storable('Bundle', schema);
  // let bundle = await Bundle.create({name: 'test'});
  // let bundles = await Bundle.get({filter: {name: 'test'}});
  let bundles = await Bundle.get();
  console.log(bundles.length);
  // let bundle = await Bundle.find(bundles[0]);
  // bundle.name = 'Updated Bundle';
  let bundle0 = bundles[0];
  // let bundle1 = bundles[1];
  bundle0.name = 'Updated';
  // bundle1.name = 'Updated 1 Name';
  // bundles = await bundle0.delete();
  bundles = await Bundle.update(bundle0);
  console.log(bundles)
  // bundle = await bundle.save();
  // console.log(bundle);
};

test().then((data) => {

}).catch((err) => {
  console.log('error', err);
});
