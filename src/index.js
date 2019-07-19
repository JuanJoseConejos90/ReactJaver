import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import login from './components/login/login';
import home from './components/home/home';
import notfound from './helpers/notFound';
import usuarios from './components/usuarios/usuarios';
import usuarioInfo from './components/usuarios/usuarioInfo';
import PrivateRoute from './helpers/PrivateRoute';
import './index.scss';
import 'font-awesome/css/font-awesome.min.css';
import * as serviceWorker from './serviceWorker';

const routing = (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={login} />
            <PrivateRoute exact path="/home" component={home} />
            <PrivateRoute exact path="/usuarios" component={usuarios} />
            <PrivateRoute exact path="/usuarioInfo" component={usuarioInfo} />
            <Route component={notfound} />
        </Switch>
    </BrowserRouter>
)


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

