import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux'
import bookReducer from './store/bookReducer'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const loggerMiddleware = storeAPI => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', storeAPI.getState())
  return result
}

const composedEnhancer = composeWithDevTools(
  // EXAMPLE: Add whatever middleware you actually want to use here
  applyMiddleware(loggerMiddleware, thunkMiddleware)
  // other store enhancers if any
)


// Do a common thing in b/w
// const myEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware)

const appStore = createStore(combineReducers({bookReducer}) , composedEnhancer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={appStore}>
     <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

