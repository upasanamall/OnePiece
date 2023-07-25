// import { DefaultLayout } from './layouts';
import { Redirect } from 'react-router-dom';
import Login from './views/Login';
const routes = [
  {
    path: '/',
    exact: true,

    component: () => <Redirect to='/login' />,
  },
  {
    path: '/login',
    component: Login,
  },
];
export default routes;
