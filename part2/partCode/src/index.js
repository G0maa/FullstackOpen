import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios'

import App from './App';

// const promise = axios.get('http://localhost:3001/notes')
// console.log(promise)

axios
  .get('http://localhost:3001/notes')
  .then(response => {
    const notes = response.data
    ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)
})


