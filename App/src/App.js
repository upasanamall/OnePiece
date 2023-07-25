import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import routes from './routes';
function App() {
  if (localStorage.getItem('userTokenItem')) {
    const data = JSON.parse(localStorage.getItem('userTokenItem'));
    if (new Date().getTime() - data.time > 60 * 60 * 1000)
      localStorage.removeItem('userTokenTime');
  }
  return (
    <>
      <Router basename={process.env.REACT_APP_BASENAME || ''}>
        <div>
          Woohooo
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={(props) => {
                  return (
                    // <route.layout {...props}>
                    <route.component {...props} />
                    // </route.layout>
                  );
                }}
              ></Route>
            );
          })}
        </div>
      </Router>
    </>
  );
}

export default App;
