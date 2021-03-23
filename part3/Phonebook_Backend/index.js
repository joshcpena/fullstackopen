require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body '));

app.get('/info', (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.send(`<span>Phonebook has info for ${persons.length} people.</span><br/><span>${Date()}</span>`);
    })
    .catch((error) => next(error));
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => response.json(persons));
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (!person.name) { return response.status(204).end(); }
      return (response.json(person));
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  // const body = request.body;
  // const randId = Math.floor(Math.random() * Math.floor(1000));
  // if (!body.name || !body.number) {
  //     return response.status(400).json({ error: 'name or number missing' });
  // } else if (persons.find(person => person.name === body.name)) {
  //     return response.status(400).json(
  //    { error: 'The name already exists in the phonebook, name must be unique' })
  // }
  // const randId = Math.floor(Math.random() * Math.floor(1000));
  // const person = {
  //     id: randId,
  //     name: body.name,
  //     number: body.number || ''
  // }
  // persons = persons.concat(person);
  // response.json(person);
  // if (!body.name) {
  //     return response.status(400).json({ error: 'content missing' });
  // }
  const { body } = request;

  const person = new Person({
    name: body.name,
    number: body.number || '',
  });
  person.save()
    .then((savedPerson) => response.json(savedPerson))
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { body } = request;

  const person = {
    name: body.name,
    number: body.number || '',
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => response.json(updatedPerson))
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.log(error);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }
  return next(error);
};
app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => console.log(`Sever running on part ${PORT}`));
