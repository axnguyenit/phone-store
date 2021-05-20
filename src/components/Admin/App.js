import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
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
const Test = React.lazy(() => import('./test'));

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

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
                <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
                <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
                <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
                <Route path="/" name="Home" render={() => {
                  return localStorage.getItem('accessToken') ? <TheLayout/> : <Login/>
                }} />
                {/* <Route path="/" name="Home" render={ props => <TheLayout {...props}/>}/> */}
              </Switch>
            </React.Suspense>
        </HashRouter>
      </Provider>
    );
  }
}

serviceWorker.unregister();
export default App;