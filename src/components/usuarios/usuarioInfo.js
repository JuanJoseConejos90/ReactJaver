import React, { Component } from 'react';
import { userService as user } from './../../services/user.services';
import Modal from 'react-bootstrap/Modal';

class usuarioInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            job: 'Soporte Tecnico',
            location: 'Sabana, San Jose CR',
            smShow: false
        };


        this.OpenModal = this.OpenModal.bind(this);


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

    render() {
        let smClose = () => this.setState({ smShow: false });
        return (
            <div className="container-fluid" data-panel="containerAvatar">
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
                                <hr></hr>

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