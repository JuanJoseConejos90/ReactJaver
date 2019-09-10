import React, { Component } from 'react';
import { userService as user } from '../../services/user.services';
import { Redirect } from 'react-router-dom';
import { ClassicSpinner } from "react-spinners-kit";
import swal from 'sweetalert';

const emailRegex = /\S+@\S+\.\S+/;
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;


class RecuperarClaveUsuario extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            repassword: '',
            show: false,
            alert: false,
            loading: false,
            redirect: false,
            msg: 'Usuario o password Incorrecto!!!'
        };

        this.handleChange = this.handleChange.bind(this);
        this.recuperarClave = this.recuperarClave.bind(this);
        this.Cancelar = this.Cancelar.bind(this);

    }

    handleChange = (event) => {

        try {
            event.preventDefault();
            this.setState({ [event.target.id]: event.target.value });

        } catch (error) {
            console.log(error);
        }

    };

    recuperarClave = (event) => {
        try {

            event.preventDefault();
            if (this.state.password !== null && this.state.repassword !== null && this.state.email !== null) {
                if (this.state.password === this.state.repassword) {
                    if (emailRegex.test(this.state.email)) {
                        if (passRegex.test(this.state.repassword)) {
                            if (this.sendEmail()) {
                                this.setState({ loading: true });
                                user.updatePassbyeEmail(this.state.email, this.state.password)
                                    .then(response => response.data)
                                    .then((data) => {
                                        if (data.code === 0) {
                                            setTimeout(() => {
                                                this.setState({ loading: false });
                                                swal("Información!", "La clave a sido actualizada espere un correo para confirmar la acción", "info");
                                            }, 1000);

                                        } else {
                                            this.setState({ loading: false });
                                            swal("Información!", "El usuario no forma del sistema JAVER!", "info");
                                        }
                                    })
                                    .catch((err) => {
                                        this.setState({ loading: false });
                                        swal("Información!", "El usuario o la clave no son correctos!", "info");
                                    });
                            } else {
                                swal("Información!", "En este momento se presenta un inconveniente en el envio de correo!", "info");
                            }

                        } else {
                            swal("Información!", "Las claves no son lo bastante seguras!", "info");
                        }

                    } else {
                        swal("Información!", "Ingrese un correo correcto!", "info");
                    }

                } else {
                    swal("Información!", "Las Claves deben de ser iguales!", "info");
                }

            } else {
                swal("Información!", "Los campos son requeridos!", "info");
            }

        } catch (error) {
            console.log(error);
        }
    }

    async sendEmail() {

        let respuesta = false;

        try {
            await user.sendEmailPass(this.state.email)
                .then(response => response.data)
                .then((data) => {
                    if (data.code === 0) {
                        respuesta = true;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

        } catch (error) {
            console.log(error);
        }

        return respuesta;
    }

    Cancelar = (event) => {
        try {
            event.preventDefault();
            this.setState({ redirect: true });
        } catch (error) {
            console.log(error);
        }
    }


    render() {
        const { loading } = this.state;
        if (this.state.redirect) {
            return <Redirect to="./" />
        }
        return (
            <div className="container" data-panel="containerRecuperarPass">
                <div className="row loading">
                    <ClassicSpinner size={100} color="#268EFC" loading={loading} />
                </div>
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card RecuperarPass">
                            <div className="card-header">
                                <h1 className="card-title text-center titulo">Olvide la clave</h1>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="input-group mb-2 mr-sm-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><i className="fa fa-envelope" /></div>
                                        </div>
                                        <input type="email" id="email" className="form-control" placeholder="email" value={this.state.email} onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-group mb-2 mr-sm-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><i className="fa fa-lock" /></div>
                                        </div>
                                        <input type="password" id="password" className="form-control" placeholder="password" value={this.state.password} onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-group mb-2 mr-sm-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><i className="fa fa-lock" /></div>
                                        </div>
                                        <input type="password" id="repassword" className="form-control" placeholder="confirm password" value={this.state.repassword} onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="row btnFoot">
                                    <hr></hr>
                                    <button type="button" id="btnRecPass" className="btn btn-lg btn-primary btn-block" onClick={this.recuperarClave}>Recuperar Clave</button>
                                    <button type="button" id="btnRecPass" className="btn btn-lg btn-light btn-block" onClick={this.Cancelar}>Cancelar</button>
                                </div>
                            </div>
                            <div className="card-footer">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecuperarClaveUsuario