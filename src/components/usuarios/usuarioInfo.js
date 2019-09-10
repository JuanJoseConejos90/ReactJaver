import React, { Component } from 'react';
import { userService as user } from './../../services/user.services';
import { Redirect } from 'react-router-dom';
import Breadcrum from './../ui/Breadcrum';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { ClassicSpinner } from "react-spinners-kit";
import Autocomplete from './../ui/Autocomplete';
import swal from 'sweetalert';
import config from './../../config';

const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

class usuarioInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            locationId: "",
            businessPhone: "",
            mobilePhone: "",
            idioma: "",
            timeZone: "",
            passActual: "",
            passNuevo: "",
            passReNuevo: "",
            email: "",
            job: "",
            idComponent: "locationUser",
            companyName: "",
            locationName: "",
            created: "",
            loading: false,
            home: false,
            show: false,
            suggestionslocations: [],
            typeLocation: 'location',
            inicio: 'Inicio',
            modulo: 'Gestión Usuarios',
            componente: 'Información'
        };

        this.handleChange = this.handleChange.bind(this);
        this.updateCuenta = this.updateCuenta.bind(this);
        this.updateTimeZone = this.updateTimeZone.bind(this);
        this.updatePass = this.updatePass.bind(this);
        this.redirectHome = this.redirectHome.bind(this);
        this.handleChangeIdioma = this.handleChangeIdioma.bind(this);
        this.handleChangeTimeZone = this.handleChangeTimeZone.bind(this);
    }


    async componentDidMount() {

        try {

            this.setState({ loading: true });
            setTimeout(() => {
                this.settings();
                this.setState({ loading: false });
            }, config.timer);

        } catch (error) {
            console.log(error);
        }

    }

    settings() {

        try {

            this.getUser();
            this.getAllLocations();

        } catch (error) {
            console.log(error);
        }
    }

    getUser() {
        try {

            let id = localStorage.getItem('userId');
            user.getUser(id)
                .then(response => response.data)
                .then((data) => {
                    if (data.code === 0) {
                        this.setState({
                            userName: data.user[0].firstName + " " + data.user[0].lastName,
                            locationId: data.user[0].locationId,
                            locationName: data.user[0].locationName,
                            businessPhone: data.user[0].businessPhone,
                            mobilePhone: data.user[0].mobilePhone,
                            email: data.user[0].email,
                            job: data.user[0].description,
                            companyName: data.user[0].companyName,
                            created: data.user[0].created,
                            timeZone: data.user[0].timeZone,
                            passActual: data.user[0].passwordUser,
                            show: true
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

        } catch (error) {
            console.log(error);
        }
    }

    getAllLocations() {
        try {

            user.getLocations()
                .then(response => response.data)
                .then((data) => {
                    if (data.code === 0) {
                        this.suggestionsLocationsFilters(data.locations)
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

        } catch (error) {
            console.log(error);
        }
    }

    suggestionsLocationsFilters(data) {
        try {

            if (data.length > 0) {
                let array = [];
                data.map((location, index) => {
                    var locationSimple = {
                        Id: location.locationId,
                        Name: location.locationName
                    }
                    array.push(locationSimple);
                    return null;
                });

                this.setState({ suggestionslocations: array });
            }


        } catch (error) {
            console.log(error);
        }
    }

    getLocation = (location) => {
        try {
            this.setState({ locationId: location })

        } catch (error) {
            console.log(error)
        }
    }

    updateCuenta = (event) => {
        try {

            event.preventDefault();
            let id = localStorage.getItem('userId');
            if (id) {

                this.setState({ loading: true });
                user.updateCuentabyUser(id, this.state.mobilePhone, this.state.businessPhone, this.state.locationId)
                    .then(response => response.data)
                    .then((data) => {
                        if (data.code === 0) {
                            setTimeout(() => {
                                swal("Información!", "Datos actualizados de manera correcta!", "info");
                                this.setState({ loading: false });
                            }, 1000);
                        } else {
                            setTimeout(() => {
                                swal("Información!", "Los datos no fueron actualizados", "error");
                                this.setState({ loading: false });
                            }, 1000);

                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        this.setState({ loading: false });
                    });

            }


        } catch (error) {
            console.log(error);
        }
    }

    updateTimeZone = (event) => {

        try {

            event.preventDefault();
            let id = localStorage.getItem('userId');
            if (id) {

                this.setState({ loading: true });
                user.updateTimeZonebyUser(id, this.state.timeZone)
                    .then(response => response.data)
                    .then((data) => {
                        if (data.code === 0) {
                            setTimeout(() => {
                                swal("Información!", "Datos actualizados de manera correcta!", "info");
                                this.setState({ loading: false });
                            }, 1000);
                        } else {
                            setTimeout(() => {
                                swal("Información!", "Los datos no fueron actualizados", "error");
                                this.setState({ loading: false });
                            }, 1000);

                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        this.setState({ loading: false });
                    });

            }

            event.preventDefault();

        } catch (error) {
            console.log(error);
        }
    }

    updatePass = (event) => {
        try {

            event.preventDefault();
            if (this.state.passNuevo === this.state.passReNuevo) {
                if (passRegex.test(this.state.passReNuevo)) {
                    let id = localStorage.getItem('userId');
                    if (id) {
                        this.setState({ loading: true });
                        user.updatePassbyUser(id, this.state.passReNuevo)
                            .then(response => response.data)
                            .then((data) => {
                                if (data.code === 0) {
                                    setTimeout(() => {
                                        swal("Información!", "Datos actualizados de manera correcta!", "info");
                                        this.setState({ loading: false });
                                    }, 1000);
                                } else {
                                    setTimeout(() => {
                                        swal("Información!", "Los datos no fueron actualizados", "error");
                                        this.setState({ loading: false });
                                    }, 1000);

                                }
                            })
                            .catch((err) => {
                                console.log(err);
                                this.setState({ loading: false });
                            });
                    }
                } else {
                    swal("Información!", "El password no es lo bastante seguro!", "info");
                }
            } else {
                swal("Información!", "No coinciden los passwords suministrados!", "info");
            }

        } catch (error) {
            console.log(error);
        }
    }

    redirectHome = (event) => {
        try {

            event.preventDefault();
            this.setState({ home: true });

        } catch (error) {
            console.log(error);
        }
    }

    handleChange = (event) => {
        try {
            event.preventDefault();
            this.setState({ [event.target.id]: event.target.value });

        } catch (error) {
            console.log(error);
        }
    }

    handleChangeIdioma = (event) => {
        try {

            event.preventDefault();
            const { value } = event.target;
            this.setState({ idioma: value });

        } catch (error) {
            console.log(error);
        }
    }

    handleChangeTimeZone = (event) => {
        try {

            event.preventDefault();
            const { value } = event.target;
            this.setState({ timeZone: value });

        } catch (error) {
            console.log(error);
        }
    }

    selectedTimeZone = (zone) => {
        try {

            return zone === this.state.timeZone;

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { loading } = this.state;
        if (this.state.home) {
            return <Redirect to="./home" />
        }
        return (
            <div className="container-fluid" data-panel="containerAvatar">
                <div className="row loading">
                    <ClassicSpinner
                        size={100}
                        color="#268EFC"
                        loading={loading}
                    />
                </div>
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
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <p className="InfoLocationAvatar">{this.state.locationName}<span className="infoCreacion">-Creado:{this.state.created.split('T')[0]}</span></p>
                                </div>

                                <div className="row rowInfoAvatar">
                                    <div className="col-4">
                                        <div className="row">
                                            <li className="fa fa-envelope"></li>
                                            <p className="rowDataTitle">Email:</p>
                                        </div>
                                        <div className="row marginRowData">
                                            <p className="rowData">{this.state.email}</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="row">
                                            <i className="fa fa-sitemap"></i>
                                            <p className="rowDataTitle">Puesto:</p>
                                        </div>
                                        <div className="row marginRowData">
                                            <p className="rowData">{this.state.job}</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="row">
                                            <i className="fa fa-globe"></i>
                                            <p className="rowDataTitle">Empresa:</p>
                                        </div>
                                        <div className="row marginRowData">
                                            <p className="rowData">{this.state.companyName}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="row rowInfoAvatar">
                                    <div className="col-4">
                                        <div className="row">
                                            <li className="fa fa-map-marker-alt"></li>
                                            <p className="rowDataTitle">Ubicación:</p>
                                        </div>
                                        <div className="row marginRowData">
                                            <p className="rowData">{this.state.locationName}</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="row">
                                            <i className="fa fa-phone"></i>
                                            <p className="rowDataTitle">Teléfono Oficina:</p>
                                        </div>
                                        <div className="row marginRowData">
                                            <p className="rowData">{this.state.businessPhone}</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="row">
                                            <i className="fa fa-mobile"></i>
                                            <p className="rowDataTitle">Teléfono Celular:</p>
                                        </div>
                                        <div className="row marginRowData">
                                            <p className="rowData">{this.state.mobilePhone}</p>
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
                                                    <div className="col-5">
                                                        {this.state.show ?
                                                            <Autocomplete suggestions={this.state.suggestionslocations}
                                                                getLocation={this.getLocation}
                                                                placeholder={this.state.locationName}
                                                                type={this.state.typeLocation}
                                                                idComponent={this.state.idComponent}
                                                                userInput={this.state.locationName} />
                                                        : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-8">
                                                <div className="form-group row">
                                                    <label htmlFor="pass" className="col-3 col-form-label">Teléfono Oficina:</label>
                                                    <div className="col-5">
                                                        <input type="number"
                                                            id="businessPhone"
                                                            name="businessPhone"
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
                                                    <label htmlFor="pass" className="col-3 col-form-label">Teléfono Celular:</label>
                                                    <div className="col-5">
                                                        <input type="number"
                                                            id="mobilePhone"
                                                            name="mobilePhone"
                                                            className="form-control"
                                                            onChange={this.handleChange}
                                                            value={this.state.mobilePhone} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr></hr>
                                        <div className="row btnActualiza">
                                            <ButtonToolbar>
                                                <Button variant="primary" size="sm" className="btncog" onClick={this.updateCuenta}>Actualizar</Button>
                                                <Button variant="light" size="sm" className="btnfilter" onClick={this.redirectHome}>Cancelar</Button>
                                            </ButtonToolbar>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="Configuracion" title="Configuración">
                                        <div className="row">
                                            <div className="col-8">
                                                <div className="form-group row">
                                                    <label htmlFor="pass" className="col-3 col-form-label">Idioma:</label>
                                                    <div className="col-5">
                                                        <select className="form-control" id="idioma" onChange={this.handleChangeIdioma}>
                                                            <option value="E">Español</option>
                                                            <option value="I">Ingles</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-8">
                                                <div className="form-group row">
                                                    <label htmlFor="pass" className="col-3 col-form-label">Zona Horaria:</label>
                                                    <div className="col-5">
                                                        <select className="form-control" id="timeZone" value={this.state.timeZone} onChange={this.handleChangeTimeZone}>
                                                            <option value="CST">Central Standard Time</option>
                                                            <option value="EST">Eastern Standard Time</option>
                                                            <option value="ACT">North America Standard Time</option>
                                                            <option value="ADT">South America Standard Time</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr></hr>
                                        <div className="row btnActualiza">
                                            <ButtonToolbar>
                                                <Button variant="primary" size="sm" className="btncog" onClick={this.updateTimeZone}>Actualizar</Button>
                                                <Button variant="light" size="sm" className="btnfilter" onClick={this.redirectHome}>Cancelar</Button>
                                            </ButtonToolbar>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="CambiarPass" title="Cambiar contraseña">
                                        <div className="row">
                                            <div className="col-8">
                                                <div className="form-group row">
                                                    <label htmlFor="pass" className="col-3 col-form-label">contraseña Actual:</label>
                                                    <div className="col-4">
                                                        <input type="password"
                                                            id="passActual"
                                                            name="passActual"
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
                                                        <input type="password"
                                                            id="passNuevo"
                                                            name="passNuevo"
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
                                                    <label htmlFor="pass" className="col-3 col-form-label">confirmar contraseña:</label>
                                                    <div className="col-4">
                                                        <input type="password"
                                                            id="passReNuevo"
                                                            name="passReNuevo"
                                                            className="form-control"
                                                            onChange={this.handleChange}
                                                            value={this.state.passReNuevo} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr></hr>
                                        <div className="row btnActualiza">
                                            <ButtonToolbar>
                                                <Button variant="primary" size="sm" className="btncog" onClick={this.updatePass}>Actualizar</Button>
                                                <Button variant="light" size="sm" className="btnfilter" onClick={this.redirectHome}>Cancelar</Button>
                                            </ButtonToolbar>
                                        </div>

                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default usuarioInfo;