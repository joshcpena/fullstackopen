const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://user_01:${password}@cluster0.p1ru3.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });


const personSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    id: Number
});

const Person = mongoose.model('Person', personSchema);


if (!process.argv[3]) {

    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })

} else if (process.argv[3]) {
    let person
    const randId = Math.floor(Math.random() * Math.floor(1000));
    console.log(typeof (randId));
    if (process.argv[4]) {
        person = new Person({
            name: process.argv[3],
            phone: process.argv[4],
            id: randId
        })
    } else {
        person = new Person({
            name: process.argv[3],
            phone: null,
            id: randId
        })
    }

    person.save().then(result => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook.`)
        mongoose.connection.close()
    })


}