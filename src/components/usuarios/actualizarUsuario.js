import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Breadcrum from './../ui/Breadcrum';
import Autocomplete from './../ui/Autocomplete';
import Progress from "react-progress-2";
import { userService as user } from './../../services/user.services';
import swal from 'sweetalert';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';
import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';

class actualizarUsuario extends Component {


    constructor(props) {
        super(props);

        this.state = {
            usuario: [],
            userId: '',
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

            departmentId: '',
            departmentName: '',
            typeDepartment: 'department',

            group: '',
            state: '',
            checkboxState: true,
            checkboxVIP: false,
            vip: '',
            lockedOut: '',
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
            componente: 'Actualizacion Usuarios'
        };

        this.handleSumit = this.handleSumit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleState = this.toggleState.bind(this);
        this.toggleVip = this.toggleVip.bind(this);

    }


    componentDidMount() {


        try {
            const { match: { params } } = this.props;

            if (params.userId) {

                this.getUser(params.userId);
                this.getAllDepartments();


            } else {
                swal("Información!", "No se obtenieron los datos del usuario!", "error");
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

    getDepartment = (department) => {

        try {
            this.setState({ departmentId: department })
        } catch (error) {
            console.log(error)
        }
    }


    getUser(userId) {

        try {

            user
                .getUser(userId)
                .then(response => response.data)
                .then(data => {
                    if (data.code === 0) {
                        this.renderInput(data.user)
                    }
                })
                .catch(err => {
                    console.log(err);
                });

        } catch (error) {
            console.log(error);
        }
    }

    renderInput(data) {

        try {

            let array = [];
            data.map((user, index) => {
                array.push(user);
                return null;
            });

            this.setState({ usuario: array });
            this.setState({
                userId: data[0].userId,
                userName: data[0].nickName,
                firstName: data[0].firstName,
                lastName: data[0].lastName,
                email: data[0].email,
                businessPhone: data[0].businessPhone,
                homePhone: data[0].homephone,
                mobilePhone: data[0].mobilePhone,
                gender: data[0].gender,
                state: data[0].state,
                vip: data[0].vip,
                lockedOut: data[0].lockedOut,
                departmentId: data[0].departmentId,
                departmentName: data[0].departmentName
            });
        } catch (error) {
            console.log(error);
        }
    }

    handleSumit = (event) => {

        try {
            event.preventDefault();
        } catch (error) {
            console.log(error)
        }
    }

    handleChange = (event) => {

        try {
            event.preventDefault();
            console.log(event.target.value);
        } catch (error) {
            console.log(error)
        }
    }

    toggleState = (event) => {
        this.setState({
            checkboxState: event.target.checked
        });
    }

    toggleVip = (event) => {
        this.setState({
            checkboxVIP: event.target.checked
        });
    }


    render() {
        const { usuario } = this.state;
        console.log(usuario);
        return (
            <div className="container-fluid" data-panel="containerUpdateUser">
                <div className="row">
                    <div className="col-12">
                        <Breadcrum inicio={this.state.inicio} modulo={this.state.modulo} componente={this.state.componente} />
                    </div>
                    <div className="col-12">
                        <form onSubmit={this.handleSumit}>
                            <div className="card">
                                <div className="card-header tittleContent">
                                    <div className="row">
                                        <div className="col-10">
                                            <h2>Actualizar Usuario:{this.state.firstName}</h2>
                                        </div>
                                        <div className="col-2 pull-right">
                                            <button className="btn btn-primary">Actualizar</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-8">
                                            <div className="form-group row">
                                                <label htmlFor="nickName" className="col-2 col-form-label">ID Usuario:</label>
                                                <div className="col-4">
                                                    <input type="text"
                                                        id="nickName"
                                                        name="nickName"
                                                        className="form-control"
                                                        placeholder="nickName"
                                                        onChange={this.handleChange}
                                                        value={this.state.userName} />
                                                </div>

                                                <div className="form-check form-check-inline">
                                                    <label className="form-check-label lblCheckBox" htmlFor="defaultCheck1">Activo</label>
                                                    <input className="form-check-input valuecheckboxActive"
                                                        type="checkbox"
                                                        id="checkActive" onClick={(event) => this.toggleState(event)}
                                                        defaultChecked={this.state.checkboxState}
                                                        value={this.state.checkboxState} />
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-8">
                                            <div className="form-group row">
                                                <label htmlFor="nickName" className="col-2 col-form-label">Nombre:</label>
                                                <div className="col-4">
                                                    <input type="text"
                                                        id="nickName"
                                                        name="nickName"
                                                        className="form-control"
                                                        placeholder="nickName"
                                                        onChange={this.handleChange}
                                                        value={this.state.firstName} />
                                                </div>

                                                <div className="form-check form-check-inline">
                                                    <label className="form-check-label lblCheckBox" htmlFor="defaultCheck1">Vip:</label>
                                                    <input className="form-check-input valuecheckboxVip"
                                                        type="checkbox"
                                                        id="checkActive" onClick={(event) => this.toggleVip(event)}
                                                        defaultChecked={this.state.checkboxVIP}
                                                        value={this.state.checkboxVIP} />
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-8">
                                            <div className="form-group row">
                                                <label htmlFor="lastName" className="col-2 col-form-label">Apellidos:</label>
                                                <div className="col-4">
                                                    <input type="text"
                                                        id="lastName"
                                                        name="lastName"
                                                        className="form-control"
                                                        placeholder="lastName"
                                                        onChange={this.handleChange}
                                                        value={this.state.lastName} />
                                                </div>

                                                <label htmlFor="email" className="col-2 col-form-label">Email:</label>
                                                <div className="col-4">
                                                    <input type="text"
                                                        id="email"
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="email"
                                                        onChange={this.handleChange}
                                                        value={this.state.email} />
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-8">
                                            <div className="form-group row">
                                                <label htmlFor="lastName" className="col-2 col-form-label">Departamentos:</label>
                                                <div className="col-4">
                                                    <Autocomplete suggestions={this.state.suggestionsdepartments}
                                                        getDepartment={this.getDepartment}
                                                        type={this.state.typeDepartment}
                                                        userInput={this.state.departmentName} />
                                                </div>

                                                <label htmlFor="businessPhone" className="col-2 col-form-label">Teléfono:</label>
                                                <div className="col-4">
                                                    <input type="text"
                                                        id="businessPhone"
                                                        name="businessPhone"
                                                        className="form-control"
                                                        placeholder="businessPhone"
                                                        onChange={this.handleChange}
                                                        value={this.state.businessPhone} />
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="card-footer">
                                    <Tabs defaultActiveKey="autenticacion" transition={false} id="noanim-tab-example">
                                        <Tab eventKey="autenticacion" title="Autenticación">
                                            <h1>home</h1>
                                        </Tab>
                                        <Tab eventKey="roles" title="Roles">
                                            <h1>roles</h1>
                                        </Tab>
                                        <Tab eventKey="grupos" title="Grupos">
                                            <h1>grupos</h1>
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <Progress.Component style={{ background: 'orange' }} thumbStyle={{ background: 'green' }} />
            </div >
        );
    }
}

export default actualizarUsuario;