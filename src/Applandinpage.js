import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Login from './components/Login';
import Register from './components/Register';

function Applandingpage() {
  return (
    <UserProvider>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Redirect to="/login" />
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}

export default Applandingpage;