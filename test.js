let emporium = require('./'),
  Schema = require('./models').Schema,
  models = emporium.models;

let test = async () => {
  emporium.config.pretty = true;

  emporium.open();

  new Schema('Person', {
    name: String,
    age: Number,
    married: Boolean
  });

  let Person = models.Person;

  let person;

  person = new Person({name: 'One', age: 1, married: true});
  await person.save();
  person = new Person({name: 'Two', age: 2, married: false});
  await person.save();
  person = new Person({name: 'Three', age: 3, married: true});
  await person.save();

  new Schema('Thing', {
    name: {type: String, default: 'Thing'},
    description: {type: String, required: true},
    purchased: {type: Date, default: new Date}
  });

  let Thing = models.Thing;

  let thing;
  thing = new Thing({description: 'Default name "Thing"'});
  await thing.save();
  thing = new Thing({name: 'Different Name', description: 'Description is required'});
  await thing.save();

  Thing.remove({name: 'updatedThing'});

  let people = await Person.fetch()

  person = people[1];
  person.age = 18;
  person.save();
  console.log('All People Count: ', people.length, '\n');

  people = await Person.fetch({_limit: 5});
  console.log('Some People Count: ', people.length, '\n');

  people = await Person.fetch({_skip: 5});
  console.log('All People But 5 Count: ', people.length, '\n');

  // people = await Person.fetch({_sort: {name: -1}});
  // console.log(people);

  await Person.remove({name: 'One'});
  console.log('Removed person named: One \n')

  person = await Person.fetchOne();
  person.name = 'New Name';
  await person.save();
  console.log('First Person: ', person, '\n');

  // Array.prototype.myUcase = function() {
  //   for (i = 0; i < this.length; i++) {
  //       this[i] = this[i].toUpperCase();
  //   }
  // };

};

test().then(() => {
  console.log('Test Completed')
}).catch((err) => {
  console.log(err);
});
