import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/global.scss'
import { App } from './App.jsx';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import {store} from './store/store'
import {HashRouter as Router} from 'react-router-dom'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
    <Router>
    <App />
    </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
