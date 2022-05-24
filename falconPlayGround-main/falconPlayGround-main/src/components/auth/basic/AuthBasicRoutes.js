import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';
import Registration from './Registration';

const AuthBasicRoutes = ({ match: { url } }) => {
  console.log(url);
 return (<Switch>
    <Route path={`${url}/`} exact component={Login} />
    <Route path={`${url}/logout`} exact component={Logout} />
    <Route path={`${url}/register`} exact component={Registration} />
    
    {/*Redirect*/}
    <Redirect to="/errors/404" />
  </Switch>)

 };
AuthBasicRoutes.propTypes = { match: PropTypes.object.isRequired };

export default withRouter(AuthBasicRoutes);
