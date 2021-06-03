import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import './scss/style.scss';
import { Provider } from 'react-redux';
import store from './store';
import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import 'core-js';
import './polyfill';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { icons } from './assets/icons';
React.icons = icons;

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));

class App extends Component {
  constructor(props) {
    super(props);
    this.sate = {
      isLogin: false
    }
  }
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
            <React.Suspense fallback={loading}>
              <Switch>
                <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
                <Route path="/" name="Home" render={() => {
                  return localStorage.getItem('accessToken') ? <TheLayout/> : <Login/>
                }} />
                <Redirect from = "*" to = "/404" />
              </Switch>
            </React.Suspense>
        </HashRouter>
      </Provider>
    );
  }
}

serviceWorker.unregister();
export default App;