import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup'
import Breadcrum from './../ui/Breadcrum';
import Autocomplete from './../ui/Autocomplete';
import Progress from "react-progress-2";
import { userService as user } from './../../services/user.services';
import { ClassicSpinner } from "react-spinners-kit";
import swal from 'sweetalert';
import Moment from 'react-moment';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import config from './../../config';

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
            jobId: '',
            companyId: '',
            departmentId: '',
            rolId: '',
            groupId: '',
            locationId: '',
            companyName: '',
            departmentName: '',
            jobName: '',
            rolName: '',
            groupName: '',
            locationName: '',
            typeCompany: 'company',
            typeLocation: 'location',
            typeRol: 'rol',
            typeGroup: 'group',
            typeDepartment: 'department',
            typeJob: 'job',
            state: '',
            checkboxState: true,
            checkboxVIP: false,
            vip: '',
            checkboxLoad: false,
            checkboxBlocked: false,
            lockedOut: '',
            suggestionscompanys: [],
            suggestionslocations: [],
            suggestionsrols: [],
            suggestionsdepartments: [],
            suggestionsgroups: [],
            suggestionsJobs: [],
            rols: [],
            groups: [],
            userByRol: [],
            userByGroup: [],
            placeholderCompanys: 'Compañias',
            placeholderLocations: 'Locaciones',
            placeholderRols: 'Roles',
            placeholderDepartment: 'Departamento',
            placeholderGroup: 'Grupo',
            placeholderJob: 'Puesto',
            idCompanys: 'idCompany',
            idLocations: 'idLocation',
            idDepartment: 'idDepartment',
            idJob: 'idjob',
            showModalRol: false,
            showModalGroup: false,
            alert: false,
            loading: false,
            redirectUsuarios: false,
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
        this.toggleChangeLoad = this.toggleChangeLoad.bind(this);
        this.toggleLocked = this.toggleLocked.bind(this);
        this.saveOrdenUserRol = this.saveOrdenUserRol.bind(this);
        this.saveOrdenUserGroup = this.saveOrdenUserGroup.bind(this);
        this.openModalRol = this.openModalRol.bind(this);
        this.openModalGroup = this.openModalGroup.bind(this);
        this.closeModalRol = this.closeModalRol.bind(this);
        this.closeModalGroup = this.closeModalGroup.bind(this);
        this.RolSeleted = this.RolSeleted.bind(this);
        this.removeRolSeleted = this.removeRolSeleted.bind(this);
        this.GroupSeleted = this.GroupSeleted.bind(this);
        this.removeGroupSeleted = this.removeGroupSeleted.bind(this);
        this.redirect = this.redirect.bind(this);
        this.handleChangeSelectgender = this.handleChangeSelectgender.bind(this);

    }

    componentDidMount() {


        try {
            this.settings();

        } catch (error) {
            console.log(error);
        }

    }

    async settings() {
        try {

            const { match: { params } } = this.props;

            if (params.userId) {

                await this.getUser(params.userId);
                await this.getAllCompanys();
                await this.getAllLocations();
                await this.getAllRols();
                await this.getAllDepartments();
                await this.getAllGroup();
                await this.getAllJobs();
                await this.getUserByRol(params.userId);
                await this.getUserByGroups(params.userId);

            } else {
                swal("Información!", "No se obtenieron los datos del usuario!", "error");
            }


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

            user
                .getLocations()
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
                        this.setState({ rols: data.rols });
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
                        this.setState({ groups: data.groups });
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

    getAllJobs() {
        try {

            user
                .getJobs()
                .then(response => response.data)
                .then(data => {
                    if (data.code === 0) {
                        this.suggestionsJobsFilters(data.jobs);
                    }
                })
                .catch(err => {
                    console.log(err);
                });

        } catch (error) {
            console.log(error)
        }
    }

    suggestionsJobsFilters(data) {

        try {

            if (data.length > 0) {
                let array = [];
                data.map((job, index) => {
                    var jobSimple = {
                        Id: job.jobId,
                        Name: job.description
                    }
                    array.push(jobSimple);
                    return null;
                });

                this.setState({ suggestionsJobs: array });

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

    getCompany = (company) => {

        try {
            this.setState({ companyId: company })
        } catch (error) {
            console.log(error)
        }
    }

    getLocation = (location) => {
        try {
            this.setState({ locationId: location })
        } catch (error) {
            console.log(error)
        }
    }

    getGroup = (group) => {
        try {
            this.setState({ groupId: group })
        } catch (error) {
            console.log(error)
        }
    }

    getRol = (rol) => {
        try {
            this.setState({ rolId: rol })
        } catch (error) {
            console.log(error)
        }
    }

    getJob = (job) => {

        try {

            this.setState({ job: job })

        } catch (error) {
            console.log(error);
        }
    }

    async getUser(userId) {

        try {

            await user
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

    getUserByRol(userId) {
        try {

            if (userId) {
                user.getUserbyRols(userId)
                    .then(response => response.data)
                    .then((data) => {
                        if (data.code === 0) {
                            this.setState({ userByRol: data.users })
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });

            }


        } catch (error) {
            console.log(error);
        }
    }

    getUserByGroups(userId) {

        try {

            if (userId) {
                user.getUserbyGroup(userId)
                    .then(response => response.data)
                    .then((data) => {
                        if (data.code === 0) {
                            this.setState({ userByGroup: data.users })
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }


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
                locationId: data[0].locationId,
                locationName: data[0].locationName,
                departmentId: data[0].departmentId,
                departmentName: data[0].departmentName,
                companyId: data[0].companyId,
                companyName: data[0].companyName,
                rolId: data[0].rolId,
                rolName: data[0].rolName,
                groupId: data[0].groupId,
                groupName: data[0].groupName,
                jobId: data[0].jobId,
                jobName: data[0].description
            }, function () { });

        } catch (error) {
            console.log(error);
        }
    }

    handleSumit = (event) => {

        try {
            event.preventDefault();
            let userCreated = localStorage.getItem('nickName');
            this.setState({ loading: true });
            user.updatedUser(this.state.userId, this.state.userName, this.state.firstName, this.state.lastName, "INTEL", null, 1,
                parseInt(this.state.departmentId), 1, parseInt(this.state.locationId), parseInt(this.state.companyId), this.state.businessPhone,
                this.state.homePhone, this.state.mobilePhone, this.state.email, this.state.gender,
                userCreated, config.date, userCreated, config.date, "HH:MM:SS", "HH:MM:SS", this.state.pass, config.state, config.state, config.state, parseInt(this.state.rolId),
                parseInt(this.state.groupId), config.state, this.state.jobId)
                .then(response => response.data)
                .then((data) => {
                    if (data.code === 0) {

                        setTimeout(() => {
                            swal("Información!", "Usuario actualizado de manera correcta!", "success");
                            this.setState({ loading: false });
                        }, 5000);

                    } else {
                        swal("Información!", "Error en la actualización de usuario!", "error");
                        this.setState({ loading: false });
                    }
                })
                .catch((err) => {
                    this.setState({ loading: false });
                    console.log(err);
                });
        } catch (error) {
            this.setState({ loading: false });
            console.log(error)
        }
    }

    handleChange = (event) => {

        try {
            event.preventDefault();
            this.setState({ [event.target.id]: event.target.value });
        } catch (error) {
            console.log(error)
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

    toggleChangeLoad = (event) => {
        this.setState({
            checkboxLoad: event.target.checked
        });
    }

    toggleLocked = (event) => {
        this.setState({
            checkboxBlocked: event.target.checked
        });
    }

    openModalRol = () => {
        this.setState({ showModalRol: true });
    }

    openModalGroup = () => {
        this.setState({ showModalGroup: true });
    }

    closeModalRol = () => {
        this.setState({ showModalRol: false });
    };

    closeModalGroup = () => {
        this.setState({ showModalGroup: false });
    };

    saveOrdenUserRol = () => {
        try {

            this.deleteRolUser(this.state.userId);
            this.state.userByRol.map((rol, index) => {
                this.saveRolByUser(rol);
                return swal("Información!", "Roles asignados al usuario de manera correcta!", "success");
            });
            this.setState({ showModalRol: false });

        } catch (error) {
            console.log(error);
        }
    };

    saveOrdenUserGroup = () => {
        try {

            this.deleteGroupUser(this.state.userId);
            this.state.userByGroup.map((group, index) => {
                this.saveGroupByUser(group);
                return swal("Información!", "Grupos asignados al usuario de manera correcta!", "success");
            });
            this.setState({ showModalGroup: false });


        } catch (error) {
            console.log(error);
        }
    };

    RolSeleted(key, index) {

        try {

            const rols = this.state.rols;
            rols.splice(index, 1);
            this.setState({ rols });

            var arrays = this.state.userByRol.slice();
            var userRol = {
                'userId': this.state.userId,
                'rolId': key.rolId,
                'rolName': key.rolName,
                'createdBy': key.createdBy,
                'created': key.created,
                'updateBy': key.updateBy,
                'updated': key.updated
            };
            arrays.push(userRol);
            this.setState({ userByRol: arrays });



        } catch (error) {
            console.log(error);
        }


    };

    GroupSeleted(key, index) {

        try {

            const groups = this.state.groups;
            groups.splice(index, 1);
            this.setState({ groups });

            var arrays = this.state.userByGroup.slice();
            var usergroup = {
                'userId': this.state.userId,
                'groupId': key.groupId,
                'groupName': key.groupName,
                'createdBy': key.createdBy,
                'created': key.created,
                'updateBy': key.updateBy,
                'updated': key.updated
            };
            arrays.push(usergroup);
            this.setState({ userByGroup: arrays });



        } catch (error) {
            console.log(error);
        }


    };

    removeRolSeleted(key, index) {

        try {

            const userByRol = this.state.userByRol;
            userByRol.splice(index, 1);
            this.setState({ userByRol });
            console.log(key);

        } catch (error) {
            console.log(error);
        }


    };

    removeGroupSeleted(key, index) {

        try {

            const userByGroup = this.state.userByGroup;
            userByGroup.splice(index, 1);
            this.setState({ userByGroup });
            console.log(key);

        } catch (error) {
            console.log(error);
        }


    };

    saveRolByUser(UserbyRol) {
        try {
            user.createdUserbyRol(UserbyRol)
                .then(response => response.data)
                .then((data) => {
                    if (data.code === 0) {
                        console.log('exitoso');
                    }

                })
                .catch((err) => {
                    console.log(err);
                });

        } catch (error) {
            console.log(error);
        }
    }

    deleteRolUser(userId) {
        try {

            user.deleteUserbyRol(userId)
                .then(response => response.data)
                .then((data) => {
                    if (data.code === 0) {
                        console.log('borrado exitoso');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });


        } catch (error) {
            console.log(error);
        }
    }

    saveGroupByUser(userByGroup) {
        try {
            user.createdUserbyGroup(userByGroup)
                .then(response => response.data)
                .then((data) => {
                    if (data.code === 0) {
                        console.log('exitoso');
                    }

                })
                .catch((err) => {
                    console.log(err);
                });

        } catch (error) {
            console.log(error);
        }
    }

    deleteGroupUser(userId) {
        try {

            user.deleteUserbyGroup(userId)
                .then(response => response.data)
                .then((data) => {
                    if (data.code === 0) {
                        console.log('borrado exitoso');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });


        } catch (error) {
            console.log(error);
        }
    }

    redirect = event => {
        this.setState(() => ({
            redirectUsuarios: true
        }));

    }

    render() {
        const { loading } = this.state;
        if (this.state.redirectUsuarios) {

            return <Redirect from="/actualizarUsuario/:userId" to="/usuarios" exact />
        }
        return (
            <div className="container-fluid" data-panel="containerUpdateUser">
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
                    <div className="col-12">
                        <form onSubmit={this.handleSumit}>
                            <div className="card">
                                <div className="card-header tittleContent">
                                    <div className="row">
                                        <div className="col-10">
                                            <h2>Actualizar Usuario:{this.state.firstName}</h2>
                                        </div>
                                        <div className="col-2 pull-right">
                                            <ButtonToolbar>
                                                <Button type="submit" variant="primary" size="sm">Guardar</Button>
                                                <Button variant="light" size="sm" onClick={this.redirect}>Cancelar</Button>
                                            </ButtonToolbar>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">

                                    <div className="row">
                                        <div className="col-8">
                                            <div className="form-group row">
                                                <label htmlFor="userName" className="col-2 col-form-label">ID Usuario:</label>
                                                <div className="col-4">
                                                    <input type="text"
                                                        id="userName"
                                                        name="userName"
                                                        className="form-control"
                                                        placeholder="userName"
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
                                                <label htmlFor="firstName" className="col-2 col-form-label">Nombre:</label>
                                                <div className="col-4">
                                                    <input type="text"
                                                        id="firstName"
                                                        name="firstName"
                                                        className="form-control"
                                                        placeholder="firstName"
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
                                                        userInput={this.state.departmentName}
                                                        placeholder={this.state.placeholderDepartment}
                                                        idComponent={this.state.idDepartment} />
                                                </div>

                                                <label htmlFor="businessPhone" className="col-2 col-form-label">Teléfono Oficina:</label>
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

                                    <div className="row">
                                        <div className="col-8">
                                            <div className="form-group row">
                                                <label htmlFor="lastName" className="col-2 col-form-label">Compañias:</label>
                                                <div className="col-4">
                                                    <Autocomplete suggestions={this.state.suggestionscompanys}
                                                        getCompany={this.getCompany}
                                                        type={this.state.typeCompany}
                                                        userInput={this.state.companyName}
                                                        placeholder={this.state.placeholderCompanys}
                                                        idComponent={this.state.idCompanys} />
                                                </div>

                                                <label htmlFor="mobilePhone" className="col-2 col-form-label">Celular:</label>
                                                <div className="col-4">
                                                    <input type="text"
                                                        id="mobilePhone"
                                                        name="mobilePhone"
                                                        className="form-control"
                                                        onChange={this.handleChange}
                                                        value={this.state.mobilePhone} />
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-8">
                                            <div className="form-group row">
                                                <label htmlFor="lastName" className="col-2 col-form-label">Puesto:</label>
                                                <div className="col-4">
                                                    <Autocomplete 
                                                           suggestions={this.state.suggestionsJobs} 
                                                           getJob={this.getJob} 
                                                           type={this.state.typeJob} 
                                                           placeholder={this.state.placeholderJob} 
                                                           idComponent={this.state.idJob} />
                                                </div>

                                                <label htmlFor="homePhone" className="col-2 col-form-label">Genero:</label>
                                                <div className="col-4">
                                                    <select className="form-control" id="genero" onChange={this.handleChangeSelectgender}>
                                                        <option value="">Seleccione</option>
                                                        <option value="M">Maculino</option>
                                                        <option value="F">Femenino</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-8">
                                            <div className="form-group row">
                                                <label htmlFor="lastName" className="col-2 col-form-label">Locaciones:</label>
                                                <div className="col-4">
                                                    <Autocomplete suggestions={this.state.suggestionslocations}
                                                        getLocation={this.getLocation}
                                                        type={this.state.typeLocation}
                                                        userInput={this.state.locationName}
                                                        placeholder={this.state.placeholderLocations}
                                                        idComponent={this.state.idLocations} />
                                                </div>

                                                <label htmlFor="homePhone" className="col-2 col-form-label">Teléfono Casa:</label>
                                                <div className="col-4">
                                                    <input type="text"
                                                        id="homePhone"
                                                        name="homePhone"
                                                        className="form-control"
                                                        onChange={this.handleChange}
                                                        value={this.state.homePhone} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div className="card-footer">
                                    <Tabs defaultActiveKey="autenticacion" transition={false} id="noanim-tab-example">
                                        <Tab eventKey="autenticacion" title="Autenticación">
                                            <div className="row tabsRow">
                                                <div className="col-8">
                                                    <div className="form-group row">
                                                        <label htmlFor="pass" className="col-2 col-form-label">Contraseña:</label>
                                                        <div className="col-4">
                                                            <input type="password"
                                                                id="pass"
                                                                name="pass"
                                                                className="form-control"
                                                                onChange={this.handleChange}
                                                                value={this.state.pass} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-8 tabsCheckChange">
                                                    <div className="form-group row">
                                                        <div className="form-check form-check-inline">
                                                            <label className="form-check-label" htmlFor="defaultCheck1">Cambiar Contraseña al ingresar:</label>
                                                            <input className="form-check-input valuecheckboxActive"
                                                                type="checkbox"
                                                                id="checkActive" onClick={(event) => this.toggleChangeLoad(event)}
                                                                defaultChecked={this.state.checkboxLoad}
                                                                value={this.state.checkboxLoad} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-8 tabsCheckChange">
                                                    <div className="form-group row">
                                                        <div className="form-check form-check-inline">
                                                            <label className="form-check-label" htmlFor="defaultCheck1">Bloquear:</label>
                                                            <input className="form-check-input valuecheckboxActive"
                                                                type="checkbox"
                                                                id="checkActive" onClick={(event) => this.toggleLocked(event)}
                                                                defaultChecked={this.state.checkboxBlocked}
                                                                value={this.state.checkboxBlocked} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="roles" title="Roles">
                                            <div className="row">
                                                <div className="col-12 tabsRow">
                                                    <ButtonToolbar>
                                                        <Button variant="light" size="sm" className="btncog" onClick={this.openModalRol}><i className="fa fa-cog"></i></Button>
                                                        <Button variant="light" size="sm" className="btnTodos">Todos</Button>
                                                    </ButtonToolbar>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <table className="table table-striped base-table" key="tableUser">
                                                    <thead>
                                                        <tr key="thTable">
                                                            <th>Rol</th>
                                                            <th>Creado</th>
                                                            <th>Fecha Actualización</th>
                                                            <th>Actualizado</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody ref={this.body}>
                                                        {this.state.userByRol.map((rol, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{rol.rolName}</td>
                                                                    <td>{rol.createdBy}</td>
                                                                    <td> <Moment format="YYYY/MM/DD">
                                                                        {rol.updated}
                                                                    </Moment></td>
                                                                    <td>{rol.updateBy}</td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="grupos" title="Grupos">
                                            <div className="row">
                                                <div className="col-12 tabsRow">
                                                    <ButtonToolbar>
                                                        <Button variant="light" size="sm" className="btncog" onClick={this.openModalGroup}><i className="fa fa-cog"></i></Button>
                                                        <Button variant="light" size="sm" className="btnTodos">Todos</Button>
                                                    </ButtonToolbar>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <table className="table table-striped base-table" key="tableUser">
                                                    <thead>
                                                        <tr key="thTable">
                                                            <th>Grupo</th>
                                                            <th>Creado</th>
                                                            <th>Fecha Actualización</th>
                                                            <th>Actualizado</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody ref={this.body}>
                                                        {this.state.userByGroup.map((group, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{group.groupName}</td>
                                                                    <td>{group.createdBy}</td>
                                                                    <td> <Moment format="YYYY/MM/DD">
                                                                        {group.updated}
                                                                    </Moment></td>
                                                                    <td>{group.updateBy}</td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <Modal size="lg" show={this.state.showModalRol} onHide={this.closeModalRol} dialogClassName="modal-90w" aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Roles</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <div className="card">
                                        <div className="card-head colDispo">Roles Disponibles</div>
                                        <div className="card-body bodyDispo">
                                            <ListGroup id="listModalRol">
                                                {this.state.rols.map((rol, index) =>
                                                    <ListGroup.Item key={index} onClick={() => this.RolSeleted(rol, index)}>
                                                        {rol.rolName.trim()}
                                                    </ListGroup.Item>
                                                )}
                                            </ListGroup>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="card">
                                        <div className="card-head colSelect">Roles Asignados</div>
                                        <div className="card-body bodySelect">
                                            <ListGroup id="listModal">
                                                {this.state.userByRol.map((rol, index) =>
                                                    <ListGroup.Item key={index} onClick={() => this.removeRolSeleted(rol, index)}>
                                                        <span className="btnTitle">{rol.rolName.trim()}</span>
                                                    </ListGroup.Item>
                                                )}
                                            </ListGroup>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="btnModalFoters">
                        <ButtonToolbar>
                            <Button variant="light" size="sm" onClick={this.closeModalRol}>Cancelar</Button>
                            <Button variant="primary" size="sm" onClick={this.saveOrdenUserRol} >Guardar</Button>
                        </ButtonToolbar>
                    </Modal.Footer>
                </Modal>

                <Modal size="lg" show={this.state.showModalGroup} onHide={this.closeModalGroup} dialogClassName="modal-90w" aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Grupos</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <div className="card">
                                        <div className="card-head colDispo">Grupos Disponibles</div>
                                        <div className="card-body bodyDispo">
                                            <ListGroup id="listModalRol">
                                                {this.state.groups.map((group, index) =>
                                                    <ListGroup.Item key={index} onClick={() => this.GroupSeleted(group, index)}>
                                                        {group.groupName.trim()}
                                                    </ListGroup.Item>
                                                )}
                                            </ListGroup>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="card">
                                        <div className="card-head colSelect">Grupos Asignados</div>
                                        <div className="card-body bodySelect">
                                            <ListGroup id="listModal">
                                                {this.state.userByGroup.map((group, index) =>
                                                    <ListGroup.Item key={index} onClick={() => this.removeGroupSeleted(group, index)}>
                                                        <span className="btnTitle">{group.groupName.trim()}</span>
                                                    </ListGroup.Item>
                                                )}
                                            </ListGroup>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="btnModalFoters">
                        <ButtonToolbar>
                            <Button variant="light" size="sm" onClick={this.closeModalGroup}>Cancelar</Button>
                            <Button variant="primary" size="sm" onClick={this.saveOrdenUserGroup} >Guardar</Button>
                        </ButtonToolbar>
                    </Modal.Footer>
                </Modal>

                <Progress.Component style={{ background: 'orange' }} thumbStyle={{ background: 'green' }} />
            </div >
        );
    }
}

export default actualizarUsuario;