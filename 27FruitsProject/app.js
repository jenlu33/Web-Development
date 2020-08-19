const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "Name is required"] //message is optional
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit."
});

// fruit.save();

// const kiwi = new Fruit ({
//   name: "Kiwi",
//   rating: 10,
//   review: "One of the best frruit!"
// });

// const orange = new Fruit ({
//   name: "Orange",
//   rating: 9,
//   review: "Delicious"
// })

// const banana = new Fruit ({
//   name: "Banana",
//   rating: 4,
//   review: "Weird texture"
// })

// specify name of mongoose model which will allow it to connect to the relevant collection
// two params: 1. array of objects, 2.callback that will log any errors

// Fruit.insertMany([kiwi, orange, banana], (error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Successfully saved all fruits!");
//   }
// });

Fruit.find((error, fruits) => {
  if (error) {
    console.log(error);
  } else {
    mongoose.connection.close(); //calling close method on our mongoose collection
    
    // fruits is an array of fruit objects
    // fruits.forEach(fruit => {
    //   console.log(fruit.name);
    // })
  }
});

// Fruit.updateOne({_id:}, {name:}, (error) => error callback)

// Fruit.deleteOne({ _id: "5f3c171e47b7ab234af8b4f5" }, (error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("successfully deleted from fruitsDB");
//   }
// });



const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema, //tells mongoose we are embedding a fruit document inside this property called favoriteFruit
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit ({
  name: "Pineapple",
  rating: 10,
  review: "I could eat this every day!"
});

// pineapple.save();

const mango = new Fruit ({
  name: "Mango",
  rating: 10,
  review: "I love eating mango!"
});

// mango.save();

// Person.updateOne({name:"Benjamin"}, {favoriteFruit: mango}, (error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("success!");
//   }
// })

const person = new Person ({
  name: "Amy",
  age: 13,
  favoriteFruit: pineapple
});

// person.save();

// Person.deleteMany({name: "Benjamin"}, (error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("successfully deleted many documents");
//   }
// })