import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom';

// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import Post from './components/posts/index';

// ----------------------------------------------------------------------
export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/dashboard">
          <DashboardLayout>
            <Products />
          </DashboardLayout>
        </Route>
        <Route path="/post">
          <Post />
        </Route>
        <Route path="/">
          <Login />
        </Route>
        <Route path="/*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}
