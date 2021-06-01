import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import routes from './routes';



const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse">Loading...</div>
  </div>
)

function App() {
  const showRoute = (routes) => {
    var result = null;
    if(routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route key = {index}
          path = {route.path}
          exact = {route.exact}
          component = {route.main} />
        )
      })
    }
    return result;
  }

  return (
    <BrowserRouter>
        <React.Suspense fallback={loading}>
            <Switch>
                {showRoute(routes)}
                <Redirect from = "*" to = "/" />
            </Switch> 
        </React.Suspense> 
    </BrowserRouter>
  );
}

export default App;