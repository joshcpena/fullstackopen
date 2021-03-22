const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

var app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

morgan.token('body', (req, res) => JSON.stringify(req.body));


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body '))

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }]

app.get('/info', (request, response) => {
    response.send(
        `<span>Phonebook has info for ${persons.length} people.</span><br/><span>${Date()}</span>`
    )
})

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);
    if (person) {
        response.json(person);
    } else {
        response.status(204).end();
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);
    response.status(204).end();
})

app.post('/api/persons', (request, response) => {
    const body = request.body;
    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'name or number missing' });
    } else if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({ error: 'The name already exists in the phonebook, name must be unique' })
    }
    const randId = Math.floor(Math.random() * Math.floor(1000));
    const person = {
        id: randId,
        name: body.name,
        number: body.number || ''
    }
    persons = persons.concat(person);
    response.json(person);
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Sever running on part ${PORT}`));