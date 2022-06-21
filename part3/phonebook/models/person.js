const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('Connecting to DB...');
mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to', url);
  })
  .catch((error) => {
    console.log('An error happend during connect,', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'Name cannot be empty.'],
  },
  number: {
    type: String,
    validate: {
      validator: (phoneNumber) => /^\d{2,3}-\d{6,}$/.test(phoneNumber) || /^\d{8,}$/.test(phoneNumber),
      message: (props) => `'${props.value}' is not a valid phone number`,
    },
    required: [true, 'Phone number required'],
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
