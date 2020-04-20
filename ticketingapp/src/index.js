import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import {createStore, compose, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import Thunk from 'redux-thunk'
import Reducer from '../src/Reducer'

const devtool = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

const store=createStore(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const app=(
    <Provider store={store}><BrowserRouter><App></App></BrowserRouter></Provider>
)
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
