# Emporium

An easy local JSON data store for node applications

## Getting Started

This is everything you need to know to set up Emporium

### Installing

Add this package to your project

```
npm install --save emporium
```

### Using

Instantiate object with optional name, default name is 'Emporium'

```
let Emporium = require('emporium');
let emporium = new Emporium('Sample');
```

Create some schemas and add them to your Emporium

```
let Schema = emporium.Schema;

let PersonSchema = new Schema('Person', {
  name: String,
  age: Number,
  married: Boolean
});

emporium.add(PersonSchema);
```

Create fancier schemas

```
let PetSchema = new Schema('Pet', {
  name: {type: String, default: 'Pet'},
  type: {type: String, required: true},
  loved: {type: Boolean, default: true}
  description: String,
  createdAt: {type: Date, default: new Date}
});

emporium.add(PetSchema);
```

Make attributes readOnly or hidden

```
let ThingSchema = new Schema('Thing', {
  createdAt: {type: Date, default: new Date, locked: true}
  secret: {type: String, default: 'Shhhhh', hidden: true}
});

// or...
let ThingSchema = new Schema('Thing', {
  createdAt: {type: Date, default: new Date, readOnly: true}
  secret: {type: String, default: 'Shhhhh', hidden: true}
});

// or...
let ThingSchema = new Schema('Thing', {
  createdAt: {type: Date, default: new Date}
  secret: {type: String, default: 'Shhhhh'}
});

ThingSchema.lock(['createdAt']);
ThingSchema.hide(['secret']);
```

You can also hide and lock default `_id` attribute

```
ThingSchema.lock(['_id']);
ThingSchema.hide(['_id']);
```

Get your models from Emporium

```
let models = emporium.models;
Person = models.Person;
Pet = models.Pet;
```

Create an object

```
let person = new Person({name: 'Peter', age: 46});
let pet = new Pet({name: 'Brian', type: 'Dog'});
```

Save your objects

```
person.save();
pet.save();
```

Fetch saved objects, filter with a query object

```
let people = Person.fetch({name: 'Peter'});
let person = Person.fetchOne({name: 'Peter'});

let pets = Pet.fetch({name: 'Brian', type: 'Dog'});
let pet = Pet.fetchOne({name: 'Brian', type: 'Dog'});
```

Remove those saved objects, by passing in the same filter

```
Person.remove({name: 'Peter'})
Pet.remove({name: 'Brian', type: 'Dog'})
```

Stay tuned for more

## Authors

* **Jay Deaton** - [Github](https://github.com/jayrdeaton)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
