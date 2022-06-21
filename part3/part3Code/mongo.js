const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://FSO2022:${password}@cluster0.wsxeg1u.mongodb.net/noteApp?retryWrites=true&w=majority`;

// Looks like defining document schema.
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

// Looks like defining collection.
const Note = mongoose.model('Note', noteSchema);

mongoose
  .connect(url)
  .then(() => {
    console.log('connected');

    // const note = new Note({
    //     content: 'Test note 3',
    //     date: new Date(),
    //     important: true,
    // })

    // return note.save()

    return Note.find({});
  })
  .then((result) => {
    console.log('notes acquired!');
    result.forEach((note) => {
      console.log(note);
    });
    return mongoose.connection.close();
  })
  .catch((err) => console.log(err));
