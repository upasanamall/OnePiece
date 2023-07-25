import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import routes from './routes';
// import withTracker from "./withTracker";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/main.css';
// import './assets/fileUpload.css';

// import './shards-dashboard/styles/shared-dashboards.1.1.0.min.css';
// import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
// import './shards-dashboard/styles/s';
export default () => {
  if (localStorage.getItem('userTokenTime')) {
    // Check if user holds token which is valid in accordance to time
    const data = JSON.parse(localStorage.getItem('userTokenTime'));
    if (new Date().getTime() - data.time > 1 * 60 * 60 * 1000) {
      // It's been more than hour since you have visited dashboard
      localStorage.removeItem('userTokenTime');
      // shouldRedirect = true;
    }
  }
  // else {
  //   // shouldRedirect = true;
  // }

  return (
    <>
      <ToastContainer
        position='bottom-left'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <Router basename={process.env.REACT_APP_BASENAME || ''}>
        <div>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={(props) => {
                  return (
                    <route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>
                  );
                }}
              />
            );
          })}
        </div>
      </Router>
    </>
  );
};
