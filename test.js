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

  let allPeople = await Person.fetch();
  console.log('All People Count: ', allPeople.length, '\n');

  await Person.remove({name: 'One'});
  console.log('Removed person named: One \n')

  let firstPerson = await Person.fetchOne();
  console.log('First Person: ', firstPerson, '\n');
};

test().then(() => {
  console.log('Test Completed')
}).catch((err) => {
  console.log(err);
});
