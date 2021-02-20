import React from 'react';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import * as log from 'loglevel';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { buildTheme } from './styles/theming';
import AppReducer from './state/app/App.reducer';
import Homepage from './homepage/homepage.component';
import PageNotFoundError from './errorPages/pageNotFoundError.component';

const history = createBrowserHistory();
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middleware.push(logger);
  log.setDefaultLevel(log.levels.DEBUG);
} else {
  log.setDefaultLevel(log.levels.ERROR);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  AppReducer(history),
  composeEnhancers(applyMiddleware(...middleware))
);

const pageContent = () => (
  <Switch>
    <Route exact path="/" render={() => <Homepage />} />
    <Route render={() => <PageNotFoundError />} />
  </Switch>
);

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={buildTheme()}>
            {pageContent()}
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    </div>
  );
};

export default App;
