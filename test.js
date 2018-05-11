let Emporium = require('./'),
  { adapters, Schema } = Emporium;

let test = async () => {
  let emporium = new Emporium();

  let APIAdapter = adapters.api;

  let tokenAdapter = new APIAdapter({
    domain: 'http://localhost:3000/oauth',
    headers: { "Content-Type": "application/json; charset=utf-8" }
  })

  let schema = new Schema({
    access_token: String,
    application_id: {type: String, default: null},
    created_at: {type: Number, default: Date.now},
    expires_in: {type: Number, default: 7200},
    grant_type: String,
    password: String,
    previous_refresh_token: {type: String, default: null},
    scopes: {type: String, default: null},
    token: {type: String, default: null},
    token_type: {type: String, default: null},
    updated_at: {type: Number, default: Date.now},
    username: String,
    // Relationships
    resource_owner_id: {type: String, default: null}
  });

  schema.setAdapter(tokenAdapter, 'token');

  let Token = emporium.storable('Token', schema);

  let token = await Token.create({ username: 'example@example.com', password: 'password', grant_type: 'password'});
  let accountAdapter = new APIAdapter({
    domain: 'http://localhost:3000/api',
    headers: { "Content-Type": "application/json; charset=utf-8" }
  })

  schema = new Schema({
    bio: {type: String, default: null},
    created_at: {type: Number, default: Date.now},
    email: {type: String, default: null},
    logo: {type: String, default: null},
    name: {type: String, default: null},
    phone: {type: String, default: null},
    updated_at: {type: Number, default: Date.now},
    uuid: {type: String, default: null},
    website: {type: String, default: null},
    // Relationships
    user_id: {type: Schema.ObjectId, default: null}
  });

  schema.setAdapter(accountAdapter, 'businesses');

  let Business = emporium.storable('Business', schema);

  accountAdapter.setHeaders({Authorization: `Bearer ${token.access_token}`});

  let businesses = await Business.get();

  let business = businesses[0];

  let catalogAdapter = new APIAdapter({
    domain: 'http://localhost:8000',
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });

  catalogAdapter.setHeaders({
    Authorization: `Bearer ${token.access_token}`,
    Business: business.uuid
  });

  schema = new Schema({
    // Base
    created_at: {type: Number, default: Date.now},
    updated_at: {type: Number, default: Date.now},
    uuid: {type: String, default: null},
    // Bundle
    amount: {type: Number, default: 0},
    color: {type: Object, default: {alpha: 0, red: 0, green: 0, blue: 0}},
    identifier: {type: String, default: null},
    index: {type: Number, default: 0},
    info: {type: String, default: null},
    name: {type: String, default: null},
    rank: {type: Number, default: 0},
    // Relationships
    catalog: {type: String, default: null}
  });

  schema.setAdapter(catalogAdapter, 'bundles');

  let Bundle = emporium.storable('Bundle', schema);
  await Bundle.create();
  await Bundle.create();
  await Bundle.create();
  let bundles = await Bundle.get();
  // Bundle.delete(bundles);
  // let bundles = await Bundle.get({skip: 1, filter: {name: 'AAA'}});
  // let bundles = await Bundle.get({skip: 3});
  console.log(bundles.length)
  // let bundle = bundles[0];
  // bundle.name = 'Updated Bundle';
  // bundle.delete();

};

test().then((data) => {

}).catch((err) => {
  console.log('error', err);
});
