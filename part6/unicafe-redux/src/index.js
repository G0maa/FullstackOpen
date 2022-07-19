import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const dispatchState = (actionKey) => {
    store.dispatch({
      type: actionKey
    })
  }

  return (
    <div>
      <button onClick={() => dispatchState('GOOD')}>good</button>
      <button onClick={() => dispatchState('OK')}>ok</button>
      <button onClick={() => dispatchState('BAD')}>bad</button>
      <button onClick={() => dispatchState('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
