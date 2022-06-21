// Verified the order of stuff with github repo.
const express = require('express');

const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const Note = require('./models/note');

const requestLogger = (request, response, next) => {
  console.log('Method: ', request.method);
  console.log('Path: ', request.path);
  console.log('Body: ', request.body);
  console.log('---');
  next();
};

app.use(express.json());
app.use(requestLogger);
app.use(morgan('tiny'));
app.use(cors());
app.use(express.static('build'));

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>');
});

app.post('/api/notes', (request, response, next) => {
  const { body } = request;

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  note.save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => next(error));
});

app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) { response.json(note); } else { response.status(404).end(); }
    })
    .catch((error) => next(error));
});

app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body;

  // Hmm... this feels a bit risky, if someone edits the frontend using developer tools,
  // he can 'go back in-time' and edit the content of a note.

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' },
  )
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

// I suppose the only reason this doesn't get called on errors
// is that it doesn't have that parameter, otherwise it would.
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') { return response.status(400).send({ error: 'malformatted id' }); }
  if (error.name === 'ValidationError') { return response.status(400).send({ error: error.message }); }
  // Move to Express default error handler.
  return next(error);
};
// Error handling middleware has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
