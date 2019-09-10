import React, { Component } from 'react';
import { userService as user } from './../../services/user.services';
import { ClassicSpinner } from "react-spinners-kit";
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';

class confimPass extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            email: '',
            loading: false,
            redirect: false,
            confirmacion: false
        };

        this.ingresar = this.ingresar.bind(this);

    }

    componentDidMount() {

        try {

            this.ValidateToken();

        } catch (error) {
            console.log(error);
        }

    }

    ValidateToken() {

        try {

            const { match: { params } } = this.props;
            if (params.token) {

                this.setState({ loading: true });
                user.validateToken(params.token)
                    .then(response => response.data)
                    .then((data) => {
                        if (data.code === 0) {
                            setTimeout(() => {
                                this.setState({ loading: false, confirmacion: true });
                                swal("Información!", "Su clave a sido restaurada", "info");
                            }, 1000);

                        } else {
                            this.setState({ loading: false });
                            swal("Información!", "El TOKEN es incorrecto", "info");
                        }
                    })
                    .catch((err) => {
                        this.setState({ loading: false });
                        console.log(err);
                        swal("Información!", "Se presento un error para activar la clave!", "info");
                    });

            } else {
                swal("Información!", "No se obtuvo el TOKEN para procesar la transacción!", "error");
            }

        } catch (error) {
            console.log(error);
        }
    }

    confirmaPass(){
        
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    ingresar = (event) => {

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
            return <Redirect from="/confimPass/:token" to="/" exact />
        }
        return (
            <div className="container" data-panel="containerConfirmPass">
                <div className="row loading">
                    <ClassicSpinner
                        size={100}
                        color="#268EFC"
                        loading={loading}
                    />
                </div>
                <div className="row">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
                        <tr>
                            <td>&nbsp;</td>
                            <td class="container">
                                <div class="content">
                                    <table role="presentation" class="main">
                                        <tr>
                                            <td class="wrapper">
                                                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td>
                                                            <p>JAVER:</p>
                                                            <p>Felicitades su clave de ingreso a sido restaurada de manera correcta ningrese al link:</p>
                                                            <table role="presentation" border="0" cellpadding="0"
                                                                cellspacing="0" class="btn btn-primary">
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="left">
                                                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td>
                                                                                            <button type="button" id="btnLogin" className="btn btn-primary" onClick={this.ingresar}>Ingresar</button>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <p>Sistema administración JAVER.</p>
                                                            <p>Gracias por su uso!!!</p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <div class="footer">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td class="content-block"> <span class="apple-link">San José, Costa Rica 20019</span> </td>
                                            </tr>
                                            <tr>
                                                <td class="content-block powered-by"> Powered by <a href="/">Javer systems...</a>. </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                    </table>

                </div>
            </div>
        );
    }
}

export default confimPass;