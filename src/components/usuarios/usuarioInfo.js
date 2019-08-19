import React, { Component } from 'react';
import { userService as user } from './../../services/user.services';
import Modal from 'react-bootstrap/Modal';
import Breadcrum from './../ui/Breadcrum';
import Progress from "react-progress-2";
import swal from 'sweetalert';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';
import Figure from 'react-bootstrap/Figure';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

class usuarioInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            job: 'Soporte Tecnico',
            location: 'Sabana, San Jose CR',
            businessPhone: "",
            homePhone: "",
            mobilePhone: "",
            idioma:"",
            zona:"",
            passActual:"",
            passNuevo:"",
            passReNuevo:"",
            smShow: false,
            inicio: 'Inicio',
            modulo: 'Gestión Usuarios',
            componente: 'Información'
        };


        this.OpenModal = this.OpenModal.bind(this);
        this.handleChange = this.handleChange.bind(this);


    }


    componentDidMount() {

        user.getUser("1")
            .then(response => response.data)
            .then((data) => {
                if (data.code === 0) {
                    this.setState({
                        userName: data.user[0].firstName + " " + data.user[0].lastName,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });

    }

    OpenModal() {
        this.setState({
            smShow: true,
            open: true
        });
    }

    handleChange = (event) => {
        try {
            event.preventDefault();
            const { name, value } = event.target;
            console.log(name, value);

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let smClose = () => this.setState({ smShow: false });
        return (
            <div className="container-fluid" data-panel="containerAvatar">
                <div className="row">
                    <div className="col-12">
                        <Breadcrum inicio={this.state.inicio} modulo={this.state.modulo} componente={this.state.componente} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <div className="card">
                            <div className="card-header" id="imgAvatar"><img id="imgAvatar" src="https://img.icons8.com/color/48/000000/user.png" alt="" /></div>
                            <div className="card-body">
                                <p className="nameAvatar">{this.state.userName}</p>
                                <p className="puestoAvatar">{this.state.job}</p>
                                <li className="fa fa-map-marker-alt"></li>
                                <p className="ubicacionAvatar">{this.state.location}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-10">
                        <div className="card">
                            <div className="card-header" id="titleAvatar">
                                <div className="row">
                                    <div className="col-10">
                                        <p className="nameAvatar">{this.state.userName}</p>
                                    </div>
                                    <div className="col-2">
                                        <button className="btn btn-primary btn-sm" onClick={this.OpenModal} >Editar Perfil</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <p className="InfoLocationAvatar">Sabana, San Jose Costa Rica<span className="infoCreacion">-Creado Junio 2018</span></p>
                                </div>

                                <div className="row rowInfoAvatar">
                                    <div className="col-4">
                                        <div className="row">
                                            <li className="fa fa-envelope"></li>
                                            <p className="rowDataTitle">Email:</p>
                                        </div>
                                        <div className="row marginRowData">
                                            <p className="rowData">juanjoseconejos90@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="row">
                                            <i className="fa fa-sitemap"></i>
                                            <p className="rowDataTitle">Puesto:</p>
                                        </div>
                                        <div className="row marginRowData">
                                            <p className="rowData">Soporte Tecnico</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="row">
                                            <i className="fa fa-globe"></i>
                                            <p className="rowDataTitle">Empresa:</p>
                                        </div>
                                        <div className="row marginRowData">
                                            <p className="rowData">ACME Corp</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="row rowInfoAvatar">
                                    <div className="col-4">
                                        <div className="row">
                                            <li className="fa fa-map-marker-alt"></li>
                                            <p className="rowDataTitle">Ubicacion:</p>
                                        </div>
                                        <div className="row marginRowData">
                                            <p className="rowData">Sabana, San Jose</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="row">
                                            <i className="fa fa-phone"></i>
                                            <p className="rowDataTitle">Telefono Oficina:</p>
                                        </div>
                                        <div className="row marginRowData">
                                            <p className="rowData">(506)85992886</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="row">
                                            <i className="fa fa-mobile"></i>
                                            <p className="rowDataTitle">Telefono Celular:</p>
                                        </div>
                                        <div className="row marginRowData">
                                            <p className="rowData">(506)85992886</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="row rowInfoAvatar">
                                    <div className="col-1">
                                        <button className="btn btn-info">75%</button>
                                    </div>
                                    <div className="col-2">
                                        <p className="avatarporcentage">Nivel de satisfaccción</p>
                                    </div>
                                    <div className="col-1">
                                        <button className="btn btn-success">75%</button>
                                    </div>
                                    <div className="col-2">
                                        <p className="avatarporcentage">% de respuesta</p>
                                    </div>
                                </div>

                            </div>
                            <div className="card-footer">
                                <Tabs defaultActiveKey="cuenta" transition={false} id="noanim-tab-example">
                                    <Tab eventKey="cuenta" title="Cuenta">
                                        <div className="row">
                                            <div className="col-8">
                                                <div className="form-group row">
                                                    <label htmlFor="pass" className="col-3 col-form-label">Ubicacion:</label>
                                                    <div className="col-4">
                                                        <input type="text"
                                                            id="ubicacion"
                                                            name="ubicacion"
                                                            className="form-control"
                                                            onChange={this.handleChange}
                                                            value={this.state.location} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-8">
                                                <div className="form-group row">
                                                    <label htmlFor="pass" className="col-3 col-form-label">Telefono Oficina:</label>
                                                    <div className="col-4">
                                                        <input type="text"
                                                            id="ubicacion"
                                                            name="ubicacion"
                                                            className="form-control"
                                                            onChange={this.handleChange}
                                                            value={this.state.businessPhone} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-8">
                                                <div className="form-group row">
                                                    <label htmlFor="pass" className="col-3 col-form-label">Telefono Celular:</label>
                                                    <div className="col-4">
                                                        <input type="text"
                                                            id="ubicacion"
                                                            name="ubicacion"
                                                            className="form-control"
                                                            onChange={this.handleChange}
                                                            value={this.state.mobilePhone} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="Configuracion" title="Configuración">
                                    <div className="row">
                                            <div className="col-8">
                                                <div className="form-group row">
                                                    <label htmlFor="pass" className="col-3 col-form-label">Idioma:</label>
                                                    <div className="col-4">
                                                        <input type="text"
                                                            id="idioma"
                                                            name="idioma"
                                                            className="form-control"
                                                            onChange={this.handleChange}
                                                            value={this.state.idioma} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-8">
                                                <div className="form-group row">
                                                    <label htmlFor="pass" className="col-3 col-form-label">Zona Horaria:</label>
                                                    <div className="col-4">
                                                        <input type="text"
                                                            id="zona"
                                                            name="zona"
                                                            className="form-control"
                                                            onChange={this.handleChange}
                                                            value={this.state.zone} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="CambiarPass" title="Cambiar contraseña">
                                    <div className="row">
                                            <div className="col-8">
                                                <div className="form-group row">
                                                    <label htmlFor="pass" className="col-3 col-form-label">contraseña Actual:</label>
                                                    <div className="col-4">
                                                        <input type="text"
                                                            id="zona"
                                                            name="zona"
                                                            className="form-control"
                                                            onChange={this.handleChange}
                                                            value={this.state.passActual} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-8">
                                                <div className="form-group row">
                                                    <label htmlFor="pass" className="col-3 col-form-label">contraseña Nueva:</label>
                                                    <div className="col-4">
                                                        <input type="text"
                                                            id="zona"
                                                            name="zona"
                                                            className="form-control"
                                                            onChange={this.handleChange}
                                                            value={this.state.passNuevo} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-8">
                                                <div className="form-group row">
                                                <label htmlFor="pass" className="col-3 col-form-label">contraseña Nueva:</label>
                                                    <div className="col-4">
                                                        <input type="text"
                                                            id="zona"
                                                            name="zona"
                                                            className="form-control"
                                                            onChange={this.handleChange}
                                                            value={this.state.passReNuevo} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </Tab>
                                </Tabs>

                            </div>
                        </div>
                    </div>
                </div>

                <Modal
                    size="sm"
                    show={this.state.smShow}
                    onHide={smClose}
                    aria-labelledby="example-modal-sizes-title-sm">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-sm">Small Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Body</Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default usuarioInfo;