import React from 'react';
import ReactDOM from 'react-dom';

import { composeWithDevTools } from 'redux-devtools-extension';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


import App from './App';

import './styles/index.less';

import reducer from './reducers';

const middleware = routerMiddleware(browserHistory)
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk, middleware)));
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Router path="/" component={App}>

      </Router>
    </Router>
  </Provider>,
  document.getElementById('root')
);
