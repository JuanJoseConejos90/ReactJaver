import React, { Component } from 'react';
import { userService as user } from '../../services/user.services';
import { Redirect } from 'react-router-dom';
import Progress from "react-progress-2";
import { ClassicSpinner } from "react-spinners-kit";
import swal from 'sweetalert';
import "react-progress-2/main.css";
import './style.module.scss';

class login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            loginAuth: false,
            username: '',
            password: '',
            recordarClave: true,
            show: false,
            alert: false,
            msg: 'Usuario o password Incorrecto!!!'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleChange = this.toggleChange.bind(this);

    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    };

    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    };

    toggleChange = (event) => {
        this.setState({
            recordarClave: event.target.checked
        });
    }

    handleSubmit = event => {

        try {

            event.preventDefault();
            if (this.state.username !== null && this.state.password !== null) {

                Progress.show();
                this.setState({ loading: true });
                user.login(this.state.username, this.state.password)
                    .then(response => response.data)
                    .then((data) => {
                        if (data.code === 0) {

                            setTimeout(() => {
                                localStorage.setItem('token', `Bearer ${data.token}`);
                                localStorage.setItem('userId', data.userId);
                                localStorage.setItem('nickName', data.nickName);
                                localStorage.setItem('group', data.groupId);
                                this.setState({ loading: false });
                                this.setState(() => ({
                                    loginAuth: true
                                }));
                            }, 5000);


                        } else {
                            this.setState({ loading: false });
                            swal("Información!", "Usuario o clave incorrecto!", "info");
                        }
                    })
                    .catch((err) => {
                        Progress.hide();
                        this.setState({ loading: false });
                        swal("Información!", "El usuario o la clave no son correctos!", "info");
                    });


            } else {
                swal("Información!", "Los campos usuario y password son requeridos!", "info");
            }


        } catch (error) {
            console.log(error);
        }

    };

    render() {
        const { loading } = this.state;

        if (this.state.loginAuth) {
            return <Redirect to="./home" />
        }
        return <div className="container">
            <div className="row loading">
                <ClassicSpinner
                    size={100}
                    color="#268EFC"
                    loading={loading}
                />
            </div>
            <div className="row rowLogin">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body cardLogin">
                            <h1 className="card-title text-center titulo">Javer</h1>
                            <br></br>
                            <h5 className="card-title text-center">Iniciar Sesión</h5>
                            <div className="input-group mb-2 mr-sm-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-user" /></div>
                                </div>
                                <input type="text" id="username" className="form-control" placeholder="usuario" value={this.state.username} onChange={this.handleChange} />
                            </div>
                            <div className="input-group mb-2 mr-sm-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-lock" /></div>
                                </div>
                                <input type="password" id="password" className="form-control" placeholder="contraseña" value={this.state.password} onChange={this.handleChange} />
                            </div>
                            <div className="form-group row olvidoPass">
                                <input className="form-check-input"
                                    type="checkbox"
                                    id="recordarClave"
                                    checked={this.state.recordarClave}
                                    onChange={this.toggleChange} />
                                <span>Recordarme</span>
                                <a href="/RecuperarClaveUsuario" className="active olvidoClave">¿Olvidaste tu contraseña?</a>
                            </div>
                            <button type="button" id="btnLogin" className="btn btn-lg btn-primary btn-block" onClick={this.handleSubmit}>Iniciar Sesión</button>
                            <hr className="my-4"></hr>
                        </div>
                    </div>
                </div>
            </div>
            <Progress.Component style={{ background: 'orange' }} thumbStyle={{ background: 'green' }} />

        </div>
    }
}

export default login;