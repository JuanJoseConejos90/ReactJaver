import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Breadcrum from './../ui/Breadcrum';
import Autocomplete from './../ui/Autocomplete';
import Progress from "react-progress-2";
import { userService as user } from './../../services/user.services';
import config from './../../config';
import swal from 'sweetalert';

const emailRegex = RegExp('/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/');
const passRegex = RegExp('/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/');

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
            mobilePhone: '',
            gender: '',
            pass: '',
            company: '',
            location: '',
            rol: '',
            department: '',
            group: '',
            suggestionscompanys: [],
            suggestionslocations: [],
            suggestionsrols: [],
            suggestionsdepartments: [],
            suggestionsgroups: [],
            placeholderCompanys: 'Compañias',
            placeholderLocations: 'Locaciones',
            placeholderRols: 'Roles',
            placeholderDepartment: 'Departamento',
            placeholderGroup: 'Grupo',
            typeCompany: 'company',
            typeLocation: 'location',
            typeRol: 'rol',
            typeDepartment: 'department',
            typeGroup: 'group',
            alert: false,
            loading: false,
            msg: '',
            formErrors: {
                userName: "",
                firstName: "",
                lastName: "",
                email: "",
                businessPhone: "",
                homePhone: "",
                mobilePhone: "",
                pass: ""
            },
            inicio: 'Inicio',
            modulo: 'Gestión Usuarios',
            componente: 'Creacion Usuarios'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSumit = this.handleSumit.bind(this);
        this.handleChangeSelectgender = this.handleChangeSelectgender.bind(this);
    }

    componentDidMount() {
        try {
            this.getAllCompanys();
            this.getAllLocations();
            this.getAllRols();
            this.getAllDepartments();
            this.getAllGroup();

        } catch (error) {
            console.log(error);
        }
    }

    getAllCompanys() {
        try {

            user
              .getCompanys()
              .then(response => response.data)
              .then(data => {
                if (data.code === 0) {
                  this.suggestionscompanysFilters(data.companys);
                }
              })
              .catch(err => {
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
                    var companySimple = {
                        Id: company.companyId,
                        Name: company.companyName
                    }
                    array.push(companySimple);
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
                data.map((rol, index) => {
                    var rolSimple = {
                        Id: rol.rolId,
                        Name: rol.rolName
                    }
                    array.push(rolSimple);
                    return null;
                });

                this.setState({ suggestionsrols: array });
            }


        } catch (error) {
            console.log(error);
        }
    }

    getAllDepartments() {
        try {

            user.getDepartments()
                .then(response => response.data)
                .then((data) => {
                    if (data.code === 0) {
                        this.suggestionsdepartmentsFilters(data.departments)
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

        } catch (error) {
            console.log(error)
        }
    }

    suggestionsdepartmentsFilters(data) {

        try {

            if (data.length > 0) {
                let array = [];
                data.map((department, index) => {
                    var departmentSimple = {
                        Id: department.departmentId,
                        Name: department.departmentName
                    }

                    array.push(departmentSimple);
                    return null;
                });

                this.setState({ suggestionsdepartments: array });
            }

        } catch (error) {
            console.log(error);
        }
    }

    getAllGroup() {
        try {

            user.getGroups()
                .then(response => response.data)
                .then((data) => {
                    if (data.code === 0) {
                        this.suggestionsgroupsFilters(data.groups)
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

        } catch (error) {
            console.log(error)
        }
    }

    suggestionsgroupsFilters(data) {

        try {

            if (data.length > 0) {
                let array = [];
                data.map((group, index) => {
                    var groupSimple = {
                        Id: group.groupId,
                        Name: group.groupName
                    }
                    array.push(groupSimple);
                    return null;
                });

                this.setState({ suggestionsgroups: array });
            }

        } catch (error) {
            console.log(error);
        }
    }

    getCompany = (company) => {

        try {
            this.setState({ company: company })

        } catch (error) {
            console.log(error);
        }
    }

    getLocation = (location) => {
        try {
            this.setState({ location: location })

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

    getDepartment = (department) => {

        try {
            this.setState({ department: department })
        } catch (error) {
            console.log(error)
        }
    }

    getGroup = (group) => {

        try {

            this.setState({ group: group })

        } catch (error) {
            console.log(error);
        }
    }


    handleSumit = (event) => {
        try {
            event.preventDefault();
            user.createdUser(this.state.userName, this.state.firstName, this.state.lastName, "INTEL", null, 1,
            parseInt(this.state.department), 1, parseInt(this.state.location), parseInt(this.state.company), this.state.businessPhone,
            this.state.homePhone, this.state.mobilePhone, this.state.email, this.state.gender,
            "JJCS", config.date, "JJCS", config.date, "HH:MM:SS", "HH:MM:SS", this.state.pass, config.state, config.state, config.state, parseInt(this.state.rol),
            parseInt(this.state.group), config.state)

            .then(response => response.data)
            .then((data) => {
                if (data.code === 0) {
                    swal("Información!", "Usuario creado de manera correcta!", "success");
                }else{
                    swal("Información!", "Error en la creación de usuario!", "error");
                }
            })
            .catch((err) => {
                console.log(err);
            });

           
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
                case "mobilePhone":
                    formErrors.mobilePhone =
                        value.length < 8 ? "El mínimo para este campo es de 8 números" : "";
                    break;
                case "pass":
                    formErrors.pass = passRegex.test(value) ? "" : "El password no es lo bastante suguro";
                    break;
                default:
                    break;
            }

            this.setState({ formErrors, [name]: value }, () => console.log(this.state));

        } catch (error) {
            console.log(error);
        }
    }

    handleChangeSelectgender = (event) => {

        try {

            event.preventDefault();
            const { value } = event.target;
            this.setState({ gender: value });


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
                                                        <label htmlFor="mobilePhone" className="col-4 col-form-label">Teléfono:</label>
                                                        <div className="col-8">
                                                            <input type="number" id="mobilePhone" name="mobilePhone" className={(formErrors.mobilePhone.length) > 0 ? "error" : "form-control"} placeholder="teléfono Personal" onChange={this.handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-12">
                                                            {formErrors.mobilePhone.length > 0 && (<span className="errorMessage">{formErrors.mobilePhone}</span>)}
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
                                                <div className="col-4">
                                                    <div className="form-group row">
                                                        <label htmlFor="businessPhone" className="col-4 col-form-label">Department:</label>
                                                        <div className="col-8">
                                                            <Autocomplete suggestions={this.state.suggestionsdepartments} getDepartment={this.getDepartment} type={this.state.typeDepartment} placeholder={this.state.placeholderDepartment} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="form-group row">
                                                        <label htmlFor="businessPhone" className="col-4 col-form-label">Grupo:</label>
                                                        <div className="col-8">
                                                            <Autocomplete suggestions={this.state.suggestionsgroups} getGroup={this.getGroup} type={this.state.typeGroup} placeholder={this.state.placeholderGroup} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="form-group row">
                                                        <label htmlFor="genero" className="col-4 col-form-label">Genero:</label>
                                                        <div className="col-8">
                                                            <select className="form-control" id="genero" onChange={this.handleChangeSelectgender}>
                                                                <option value="M">Maculino</option>
                                                                <option value="F">Femenino</option>
                                                            </select>
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
                                                        <label htmlFor="pass" className="col-4 col-form-label">Password:</label>
                                                        <div className="col-8">
                                                            <input type="password" id="pass" name="pass" className={(formErrors.pass.length) > 0 ? "error" : "form-control"} placeholder="password" onChange={this.handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-12">
                                                            {formErrors.pass.length > 0 && (<span className="errorMessage">{formErrors.pass}</span>)}
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
            </div >
        );
    }
}

export default crearUsuario;