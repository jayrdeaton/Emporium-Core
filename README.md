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

Instantiate object

```
let emporium = require('emporium');
```

Open a store by passing in a name

```
emporium.open('Sample');
```

Create some schemas

```
let Schema = emporium.Schema;

new Schema('Person', {
  name: String,
  age: Number,
  married: Boolean
});
```

Create fancier schemas

```
new Schema('Pet', {
  name: {type: String, default: 'Pet'},
  type: {type: String, required: true},
  loved: {type: Boolean, default: true}
  description: String,
  createdAt: {type: Date, default: new Date}
});
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
