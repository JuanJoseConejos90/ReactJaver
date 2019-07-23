import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Breadcrum from './../ui/Breadcrum';
import Autocomplete from './../ui/Autocomplete';
import Progress from "react-progress-2";
import SweetAlert from 'sweetalert-react';
import { userService as user } from './../../services/user.services';
import 'sweetalert/dist/sweetalert.css';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class crearUsuario extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            firstName: '',
            lastName: '',
            email: '',
            businessPhone: '',
            homePhone: '',
            company: '',
            location: '',
            rol: '',
            suggestionscompanys: [],
            suggestionslocations: [],
            suggestionsrols: [],
            placeholderCompanys: 'Compañias',
            placeholderLocations: 'Locaciones',
            placeholderRols: 'Roles',
            typeCompany: 'company',
            typeLocation: 'location',
            typeRol: '',
            alert: false,
            loading: false,
            msg: '',
            formErrors: {
                userName: "",
                firstName: "",
                lastName: "",
                email: "",
                businessPhone: "",
                homePhone: ""
            },
            inicio: 'Inicio',
            modulo: 'Gestión Usuarios',
            componente: 'Creacion Usuarios'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSumit = this.handleSumit.bind(this);
    }

    componentDidMount() {
        try {
            this.getAllCompanys();
            this.getAllLocations();
            this.getAllRols();

        } catch (error) {
            console.log(error);
        }
    }

    getAllCompanys() {
        try {

            user.getCompanys()
                .then(response => response.data)
                .then((data) => {
                    if (data.code === 0) {
                        this.suggestionscompanysFilters(data.companys)
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

        } catch (error) {
            console.log(error)
        }
    }

    suggestionscompanysFilters(data) {
        try {

            if (data.length > 0) {
                let array = [];
                data.map((company, index) => {
                    array.push(company.companyName);
                    return null;
                });

                this.setState({ suggestionscompanys: array });
            }


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
                data.map((locations, index) => {
                    array.push(locations.lacationName);
                    return null;
                });

                this.setState({ suggestionslocations: array });
            }


        } catch (error) {
            console.log(error);
        }
    }

    getAllRols() {
        try {

            user.getrols()
                .then(response => response.data)
                .then((data) => {
                    if (data.code === 0) {
                        this.suggestionsRolsFilters(data.rols)
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

        } catch (error) {
            console.log(error);
        }
    }

    suggestionsRolsFilters(data) {
        try {

            if (data.length > 0) {
                let array = [];
                data.map((rols, index) => {
                    array.push(rols.rolName);
                    return null;
                });

                this.setState({ suggestionsrols: array });
            }


        } catch (error) {
            console.log(error);
        }
    }

    getCompany = (companyName) => {

        try {
            this.setState({ company: companyName })

        } catch (error) {
            console.log(error);
        }
    }

    getLocation = (locationName) => {
        try {
            this.setState({ location: locationName })

        } catch (error) {
            console.log(error)
        }
    }

    getRol = (rol) => {
        try {
            this.setState({ rol: rol })
        } catch (error) {
            console.log(error);
        }
    }


    handleSumit = (event) => {
        try {
            event.preventDefault();
        } catch (error) {
            console.log(error);
        }

    }

    handleChange = (event) => {

        try {

            event.preventDefault();
            const { name, value } = event.target;
            let formErrors = { ...this.state.formErrors };

            switch (name) {
                case "userName":
                    formErrors.userName =
                        value.length < 3 ? "El mínimo para este campo es de 3 caracteres" : "";
                    break;
                case "firstName":
                    formErrors.firstName =
                        value.length < 3 ? "El mínimo para este campo es de 3 caractéres" : "";
                    break;
                case "lastName":
                    formErrors.lastName =
                        value.length < 3 ? "El mínimo para este campo es de 3 caractéres" : "";
                    break;
                case "email":
                    formErrors.email = emailRegex.test(value) ? "" : "El correo no es válido";
                    break;
                case "businessPhone":
                    formErrors.businessPhone =
                        value.length < 8 ? "El mínimo para este campo es de 8 números" : "";
                    break;
                case "homePhone":
                    formErrors.homePhone =
                        value.length < 8 ? "El mínimo para este campo es de 8 números" : "";
                    break;

                default:
                    break;
            }

            this.setState({ formErrors, [name]: value }, () => console.log(this.state));

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { formErrors } = this.state;
        return (
            <div className="container-fluid" data-panel="containerCreatedUsers">
                <div className="row">
                    <div className="col-12">
                        <Breadcrum inicio={this.state.inicio} modulo={this.state.modulo} componente={this.state.componente} />
                    </div>
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header tittleContent">
                                <div className="row">
                                    <div className="col-10">
                                        <h2>Crear Usuario</h2>
                                    </div>
                                    <div className="col-2 pull-right">
                                        <button className="btn btn-primary"><Link to="./usuarios">Cancelar</Link></button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="container">
                                        <form onSubmit={this.handleSumit}>

                                            <div className="row">

                                                <div className="col-4">
                                                    <div className="form-group row">
                                                        <label htmlFor="userName" className="col-4 col-form-label">UserName:</label>
                                                        <div className="col-8">
                                                            <input type="text" id="userName" name="userName" className={(formErrors.userName.length > 0) ? "error" : "form-control"} placeholder="userName" onChange={this.handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-12">
                                                            {formErrors.userName.length > 0 && (<span className="errorMessage">{formErrors.userName}</span>)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="form-group row">
                                                        <label htmlFor="firstName" className="col-4 col-form-label">Nombre:</label>
                                                        <div className="col-8">
                                                            <input type="text" id="firstName" name="firstName" className={(formErrors.firstName.length) > 0 ? "error" : "form-control"} placeholder="nombre" onChange={this.handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-12">
                                                            {formErrors.firstName.length > 0 && (<span className="errorMessage">{formErrors.firstName}</span>)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="form-group row">
                                                        <label htmlFor="lastName" className="col-4 col-form-label">Apellidos:</label>
                                                        <div className="col-8">
                                                            <input type="text" id="lastName" name="lastName" className={(formErrors.lastName.length) > 0 ? "error" : "form-control"} placeholder="apellidos" onChange={this.handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-12">
                                                            {formErrors.lastName.length > 0 && (<span className="errorMessage">{formErrors.lastName}</span>)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">

                                                <div className="col-4">
                                                    <div className="form-group row">
                                                        <label htmlFor="email" className="col-4 col-form-label">Email:</label>
                                                        <div className="col-8">
                                                            <input type="text" id="email" name="email" className={(formErrors.email.length > 0) ? "error" : "form-control"} placeholder="correo" onChange={this.handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-12">
                                                            {formErrors.email.length > 0 && (<span className="errorMessage">{formErrors.email}</span>)}
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="col-4">
                                                    <div className="form-group row">
                                                        <label htmlFor="businessPhone" className="col-4 col-form-label">Teléfono:</label>
                                                        <div className="col-8">
                                                            <input type="number" id="businessPhone" name="businessPhone" className={(formErrors.businessPhone.length) > 0 ? "error" : "form-control"} placeholder="teléfono trabajo" onChange={this.handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-12">
                                                            {formErrors.businessPhone.length > 0 && (<span className="errorMessage">{formErrors.businessPhone}</span>)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="form-group row">
                                                        <label htmlFor="homePhone" className="col-4 col-form-label">Teléfono:</label>
                                                        <div className="col-8">
                                                            <input type="number" id="homePhone" name="homePhone" className={(formErrors.homePhone.length) > 0 ? "error" : "form-control"} placeholder="teléfono casa" onChange={this.handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-12">
                                                            {formErrors.homePhone.length > 0 && (<span className="errorMessage">{formErrors.homePhone}</span>)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="form-group row">
                                                        <label htmlFor="businessPhone" className="col-4 col-form-label">Compañia:</label>
                                                        <div className="col-8">
                                                            <Autocomplete suggestions={this.state.suggestionscompanys} getCompany={this.getCompany} type={this.state.typeCompany} placeholder={this.state.placeholderCompanys} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="form-group row">
                                                        <label htmlFor="businessPhone" className="col-4 col-form-label">Locación:</label>
                                                        <div className="col-8">
                                                            <Autocomplete suggestions={this.state.suggestionslocations} getLocation={this.getLocation} type={this.state.typeLocation} placeholder={this.state.placeholderLocations} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="form-group row">
                                                        <label htmlFor="businessPhone" className="col-4 col-form-label">Roles:</label>
                                                        <div className="col-8">
                                                            <Autocomplete suggestions={this.state.suggestionsrols} getRol={this.getRol} type={this.state.typeRol} placeholder={this.state.placeholderRols} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-12">
                                                    <button type="submit" className="btn btn-primary btn-lg btn-block">Crear</button>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                            </div>
                        </div>
                    </div>
                </div>
                <Progress.Component style={{ background: 'orange' }} thumbStyle={{ background: 'green' }} />
                <SweetAlert show={this.state.alert} title="Información" text={this.state.msg} onConfirm={() => this.setState({ alert: false })} />
            </div >
        );
    }
}

export default crearUsuario;