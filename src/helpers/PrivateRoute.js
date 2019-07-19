import React from 'react';
import { Redirect, Route } from 'react-router-dom';

var token = localStorage.getItem('token');
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        token ? (
            <Component {...props} />
        ) : (
                <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                }} />
            )
    )} />
);



export default PrivateRoute;