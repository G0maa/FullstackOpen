import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

let counter = 1;

const refresh = () => {ReactDOM.createRoot(document.getElementById('root')).render(
    <App counter ={counter}/>
);
}

setInterval(() => {
    refresh()
    counter += 1
}, 1000)
