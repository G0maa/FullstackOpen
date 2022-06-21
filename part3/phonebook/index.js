const express = require('express');

const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const Person = require('./models/person');

app.use(express.json());

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan('tiny', { skip: (req) => req.method === 'POST' }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', { skip: (req) => req.method !== 'POST' }));

app.use(cors());
app.use(express.static('build'));

app.get('/', (request, response) => {
  response.send('<h1>Hello Noriel!</h1>');
});

app.get('/info', (request, response) => {
  Person.count()
    .then((result) => {
      response.send(`
      <div>
        <h1>Phonebook has info for ${result} people</h1>
        <h1>${new Date()}</h1>
      </div>
    `);
    });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then((result) => {
    response.json(result);
  })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' },
  )
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body;

  const newPerson = new Person({ name, number });

  // Instead of .then(), I want to raise an error.
  // Not sure if there's a cleaner way to do this.
  Person
    .count({ name })
    .then((countPerson) => {
      if (countPerson !== 0) { return response.status(400).send({ error: 'Person already exists, use PUT request instead.' }); }

      return newPerson.save()
        .then((savedPerson) => {
          response.json(savedPerson);
        });
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).end();
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.name);
  console.error(error.message);

  if (error.name === 'CastError') { return response.status(400).send({ error: 'malformatted id' }); }
  if (error.name === 'ValidationError') { return response.status(400).send({ error: error.message }); }

  return next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
const URL = `http://localhost:${PORT}`;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`URL is: ${URL}`);
});
