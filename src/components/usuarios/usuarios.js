import React, { Component } from 'react';
import { userService as user } from './../../services/user.services';
import { Link } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Breadcrum from './../ui/Breadcrum';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Collapse from 'react-bootstrap/Collapse';
import ListGroup from 'react-bootstrap/ListGroup'
import Modal from 'react-bootstrap/Modal';
import Moment from 'react-moment';
import 'moment-timezone';
import { ClassicSpinner } from "react-spinners-kit";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import createFilter from './../../helpers/filter';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import swal from 'sweetalert';
import $ from 'jquery';

class usuarios extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            keys: [],
            keysModal: [],
            optionsModal: [],
            keysSelected: [],
            filterSearch: [],
            filtersDb: [],
            columnsType: [],
            usersDeleted: [],
            filterSettings: [{ property: "", value: "", operador: "" }],
            filterCount: 0,
            filterCreated: 1,
            buscar: '',
            colapse: false,
            showModal: false,
            loading: false,
            direction: 'asc',
            inicio: 'Inicio',
            modulo: 'Gestión Usuarios',
            componente: 'Usuarios'
        };

        this.handleChange = this.handleChange.bind(this);
        this.colapseFilter = this.colapseFilter.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveOrden = this.saveOrden.bind(this);
        this.KeySeleted = this.KeySeleted.bind(this);
        this.removeKeySeleted = this.removeKeySeleted.bind(this);
        this.handleChangeSelectOperador = this.handleChangeSelectOperador.bind(this);
        this.handleChangeSelectColumn = this.handleChangeSelectColumn.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.runFilter = this.runFilter.bind(this);
        this.loadData = this.loadData.bind(this);
        this.deleteFilter = this.deleteFilter.bind(this);
        this.handleChangeActionBydelete = this.handleChangeActionBydelete.bind(this);
        this.toggleDelete = this.toggleDelete.bind(this);
        this.deletedUser = this.deletedUser.bind(this);
        this.onSort = this.onSort.bind(this)
    }

    onSort = (event, key) => {
        try {
            event.preventDefault();
            let direction;
            if (this.state.direction === 'asc') {
                direction = 'desc';
            } else if (this.state.direction === 'desc') {
                direction = 'asc';
            }
            const sortedUsers = this.state.users.sort((a, b) => {
                switch (key) {
                    case 'userId':
                        const userIdF = a.userId;
                        const userIdL = b.userId;
                        if (userIdF < userIdL)
                            return -1;
                        if (userIdF > userIdL)
                            return 1;
                        else return 0;

                    case 'nickName':
                        const nickNameF = a.nickName.toUpperCase();
                        const nickNameL = b.nickName.toUpperCase();
                        if (nickNameF < nickNameL)
                            return -1;
                        if (nickNameF > nickNameL)
                            return 1;
                        else return 0;

                    case 'firstName':
                        const firstNameF = a.firstName.toUpperCase();
                        const firstNameL = b.firstName.toUpperCase();
                        if (firstNameF < firstNameL)
                            return -1;
                        if (firstNameF > firstNameL)
                            return 1;
                        else return 0;

                    case 'lastName':
                        const lastNameF = a.lastName.toUpperCase();
                        const lastNameL = b.lastName.toUpperCase();
                        if (lastNameF < lastNameL)
                            return -1;
                        if (lastNameF > lastNameL)
                            return 1;
                        else return 0;

                    case 'email':
                        const emailF = a.email.toUpperCase();
                        const emailL = b.email.toUpperCase();
                        if (emailF < emailL)
                            return -1;
                        if (emailF > emailL)
                            return 1;
                        else return 0;

                    case 'state':
                        const stateF = a.state.toUpperCase();
                        const stateL = b.state.toUpperCase();
                        if (stateF < stateL)
                            return -1;
                        if (stateF > stateL)
                            return 1;
                        else return 0;

                    case 'created':
                        const createdF = a.created;
                        const createdL = b.created;
                        if (createdF < createdL)
                            return -1;
                        if (createdF > createdL)
                            return 1;
                        else return 0;

                    case 'updated':
                        const updatedF = a.updated;
                        const updatedL = b.updated;
                        if (updatedF < updatedL)
                            return -1;
                        if (updatedF > updatedL)
                            return 1;
                        else return 0;

                    case 'updateBy':
                        const updateByF = a.updateBy;
                        const updateByL = b.updateBy;
                        if (updateByF < updateByL)
                            return -1;
                        if (updateByF > updateByL)
                            return 1;
                        else return 0;

                    default:
                        break;
                }

                return null;
            })

            if (direction === 'desc') {
                sortedUsers.reverse()
            }

            this.setState({ users: sortedUsers });
            this.setState({ direction: direction });

        } catch (error) {
            console.log(error);
        }
    }


    handleChange = (event) => {

        try {

            event.preventDefault();
            let data = event.target.value;
            this.setState({ buscar: data });
            console.log(this.state.buscar);

        } catch (error) {
            console.log(error);
        }

    };

    toggleDelete = (event) => {

        try {

            let data = event.currentTarget.attributes['data-id'].value;
            if (this.state.usersDeleted.indexOf(data) === -1) {
                this.setState(prevState => ({
                    usersDeleted: [...prevState.usersDeleted, data]
                }));

            } else {
                var index = this.state.usersDeleted.indexOf(data);
                if (index > -1) {
                    let data = this.state.usersDeleted;
                    data.splice(index, 1);
                    this.setState(prevState => ({
                        usersDeleted: [...prevState.usersDeleted, data]
                    }));
                }
            }


        } catch (error) {
            console.log(error);
        }

    }

    colapseFilter = () => {
        this.setState({
            colapse: !this.state.colapse
        });
    };

    openModal = () => {
        this.setState({ showModal: true });
    };

    closeModal = () => {
        this.setState({ showModal: false });
    };

    saveOrden = () => {

        try {

            if (this.state.keysSelected.length > 0) {
                var arrayOfStrings = this.state.keysSelected;
                var query = arrayOfStrings.join();
                user.getQueryUserFilter(query)
                    .then(response => response.data)
                    .then((data) => {
                        if (data.code === 0) {
                            this.setState({ users: data.users, showModal: false });
                            this.getItemHeader(data.users[0]);
                            this.forceUpdate();
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });

            } else {
                swal("Información!", "Se debe se seleccionar al menos opción!", "info");
            }

        } catch (error) {
            console.log(error);
        }

    };

    componentDidMount() {

        try {

            this.getSettings();

        } catch (error) {
            console.log(error);
        }

    }

    async getSettings() {

        try {

            await this.getColumnsType();
            await this.getUsers();

        } catch (error) {
            console.log(error);
        }
    }

    getUsers() {
        try {

            this.setState({ loading: true });
            user.getusers()
                .then(response => response.data)
                .then((data) => {
                    if (data.code === 0) {
                        setTimeout(() => {
                            this.setState({ users: data.users });
                            this.getItemHeader(data.users[0]);
                            this.getOptionsModal(data.users[0]);
                            this.getFiltersDb(data.users[0])
                            this.countFilter();
                            const { filterSettings } = this.state;
                            let key = Object.keys(data.users[0]);
                            filterSettings[0].property = key[0];
                            this.setState({ filterSettings });
                            this.setState({ loading: false });
                        }, 1000);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });


        } catch (error) {
            console.log(error);
        }
    }

    getColumnsType() {

        try {

            user.getInfotbUsers()
                .then(response => response.data)
                .then((data) => {
                    if (data.code === 0) {
                        this.setState({ columnsType: data.colums });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });


        } catch (error) {
            console.log(error);
        }
    }

    getFiltersDb(data) {

        try {

            var fistType = Object.keys(data);
            let columType = this.getTypebyName(fistType[0]);
            let tipo = (columType[0].tipo != null) ? columType[0].tipo : "varchar";
            user.getFilterbyDataType(tipo)
                .then(response => response.data)
                .then((data) => {
                    if (data.code === 0) {
                        this.setState({ filtersDb: data.filters });
                        const { filterSettings } = this.state;
                        filterSettings[0].operador = data.filters[0].descriptionING;
                        this.setState({ filterSettings });

                    }
                })
                .catch((err) => {
                    console.log(err);

                });

        } catch (error) {
            console.log(error);
        }
    }

    renderTableHeader() {

        try {

            if (this.state.users.length > 0) {
                let header = Object.keys(this.state.users[0]);
                return header.map((key, index) => {
                    //let keyTranslate = this.getColumnNamesTranslate(key);
                    //return <th key={index}>{keyTranslate}</th>
                    return <th key={index} onClick={e => this.onSort(e, key)}><span className="sort-by">{key.trim()}</span></th>

                })
            }

        } catch (error) {
            console.log(error)
        }

    }

    countFilter() {

        try {
            if (this.state.users.length > 0) {
                let counter = Object.keys(this.state.users[0]);
                this.setState({ filterCount: counter.length });
            }
        } catch (error) {
            console.log(error)
        }
    }

    renderTableData() {

        try {
            if (this.state.users.length > 0) {
                return this.state.users
                    .filter((user, index) => {
                        return user.nickName.indexOf(this.state.buscar) >= 0 ||
                            user.firstName.indexOf(this.state.buscar) >= 0 ||
                            user.lastName.indexOf(this.state.buscar) >= 0 ||
                            user.email.indexOf(this.state.buscar) >= 0 ||
                            user.state.indexOf(this.state.buscar) >= 0
                    })
                    .map((user, index) => {
                        return (
                            <tr key={user.userId}>
                                {this.renderRowTables(user)}
                            </tr>
                        )
                    })
            }

        } catch (error) {
            console.log(error);
        }
    }

    renderRowTables(user) {
        try {

            let header = Object.keys(this.state.users[0]);
            return header.map((key, index) => {
                var value = (this.isDate(user[key]) ? this.parseMoment(user[key]) : user[key]);
                var dataId = user[key];
                var path = "/actualizarUsuario/" + value;
                if (index === 0) {
                    return <td key={index}>
                        <div className="form-check">
                            <input type="checkbox"
                                className="form-check-input"
                                id="checkId"
                                data-id={dataId}
                                onClick={(event) => this.toggleDelete(event)} />
                            <Link to={path}>{value}</Link>
                        </div>
                    </td>
                } else {
                    return <td key={index}>{value}</td>
                }
            })

        } catch (error) {
            console.log(error);
        }
    }

    isDate(value) {

        var expresion = new RegExp(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);
        if (expresion.test(value)) {
            return true;
        } else {
            return false;
        }
    }

    isEmpty(str) {
        if (typeof str == 'undefined' || !str || str.length === 0 || str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str) || str.replace(/\s/g, "") === "") {
            return true;
        }
        else {
            return false;
        }
    }

    parseMoment(value) {
        return (
            <Moment format="YYYY/MM/DD">
                {value}
            </Moment>
        );
    }

    KeySeleted(key, index) {

        try {

            var arrays = this.state.keysSelected.slice();
            arrays.push(key);
            this.setState({ keysSelected: arrays });

            const keys = this.state.keysModal;
            keys.splice(index, 1);
            this.setState({ keys });

        } catch (error) {
            console.log(error);
        }


    }

    removeKeySeleted(key, index) {

        try {

            var arrays = this.state.keysModal.slice();
            arrays.push(key);
            this.setState({ keysModal: arrays });

            const keys = this.state.keysSelected;
            keys.splice(index, 1);
            this.setState({ keys });

        } catch (error) {
            console.log(error);
        }


    }

    getItemHeader(data) {

        try {

            let header = Object.keys(data);
            let array = [];
            header.map((key) => {
                //let keyTranslate = this.getColumnNamesTranslate(key);
                //array.push(keyTranslate);
                array.push(key);
                return null;
            });

            this.setState({ keys: array });

        } catch (error) {
            console.log(error);
        }
    }

    getColumnNamesTranslate(column) {
        try {

            let name = '';
            switch (column) {
                case "userId":
                    name = "Id";
                    break;
                case "nickName":
                    name = "Usuario";
                    break;
                case "firstName":
                    name = "Nombre";
                    break;
                case "lastName":
                    name = "Apellido";
                    break;
                case "email":
                    name = "Correo";
                    break;
                case "state":
                    name = "Estado";
                    break;
                case "created":
                    name = "Creado";
                    break;
                case "updated":
                    name = "Actualizado";
                    break;
                case "updateBy":
                    name = "Actualizado por";
                    break;
                default:
                    break;
            }

            return name;

        } catch (error) {
            console.log(error);
        }
    }

    getOptionsModal(data) {
        try {

            let keysModal = Object.keys(data);
            let array = [];
            keysModal.map((key) => {
                array.push(key);
                return null;
            });

            this.setState({ optionsModal: array, keysModal: array });

        } catch (error) {
            console.log(error);
        }
    }

    getTypebyName(type) {
        try {

            let data = this.state.columnsType;
            let value = data.filter(x => x.columna === type);
            return value;

        } catch (error) {
            console.log(error);
        }
    }

    renderListOptions() {
        try {

            if (this.state.users.length > 0) {
                let header = Object.keys(this.state.users[0]);
                return header.map((key, index) => {
                    return (
                        <option key={index} value={index} >{key}</option>
                    )
                })
            }


        } catch (error) {
            console.log(error);
        }
    }

    renderFilterOptions() {
        try {

            return this.state.filtersDb.map((filter, index) => {
                return (
                    <option key={index} value={filter.descriptionING}>{filter.descriptionING}</option>
                )
            })

        } catch (error) {
            console.log(error);
        }
    }

    handleChangeSelectColumn = (event) => {

        try {

            const { filterSettings } = this.state;
            let index = event.target.dataset.index;
            var property = $(`#property-${index} option:selected`).text();
            filterSettings[index].property = property
            this.setState({ filterSettings });
            let indexColum = event.target.value;
            let type = event.currentTarget[indexColum].innerHTML;
            let columType = this.getTypebyName(type);
            user.getFilterbyDataType(columType[0].tipo)
                .then(response => response.data)
                .then((data) => {
                    if (data.code === 0) {
                        this.changeFilterOPTIONS(index, data.filters)
                        this.forceUpdate();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

        } catch (error) {
            console.log(error)
        }

    };

    changeFilterOPTIONS(id, data) {
        try {
            let select = $(`#operador-${id}`);
            select.empty();

            for (let index = 0; index < data.length; index++) {
                var option = '<option value="' + index + '">' + data[index].descriptionING + '</option>';
                select.append(option)
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleChangeSelectOperador = (event) => {

        try {

            event.preventDefault();
            const { filterSettings } = this.state;
            let index = event.target.dataset.index;
            var operador = $(`#operador-${index} option:selected`).text();
            filterSettings[index].operador = operador;
            this.setState({ filterSettings });

        } catch (error) {
            console.log(error)
        }

    };

    handleChangeValue = (event) => {

        try {

            event.preventDefault();
            const { filterSettings } = this.state;
            let index = event.target.dataset.index;
            filterSettings[index].value = event.target.value.toUpperCase();
            this.setState({ filterSettings });

        } catch (error) {
            console.log(error);
        }

    };

    runFilter(event) {

        try {


            if (this.state.users.length > 0) {

                try {

                    event.preventDefault();
                    var datos = this.state.users;
                    const { filterSettings } = this.state;
                    datos = datos.filter(createFilter(...filterSettings));
                    this.setState({ users: datos });


                } catch (error) {
                    console.log(error);
                }

            }

        } catch (error) {
            console.log(error);
        }

    }

    loadData = (event) => {

        try {
            event.preventDefault();
            user.getusers()
                .then(response => response.data)
                .then((data) => {
                    if (data.code === 0) {
                        this.setState({ users: data.users, filterCount: 0, filterCreated: 0 });
                        this.getItemHeader(data.users[0]);
                        this.getOptionsModal(data.users[0]);
                        this.countFilter();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

        } catch (error) {
            console.log(error);
        }

    };

    deletedUser(event) {
        try {

            event.preventDefault();
            swal({
                title: "Información",
                text: "Desea eliminar los usuarios seleccionados!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        this.deleteUsersbyId();
                        this.getSettings();
                    }
                });


        } catch (error) {
            console.log(error)
        }
    }

    deleteUsersbyId() {
        try {

            this.state.usersDeleted.map((user, index) => {
                this.deletedUserAPI(user);
                return null;
            });

        } catch (error) {
            console.log(error);
        }

    }

    deletedUserAPI(id) {

        try {

            if (id) {

                user.deleteUserbyId(id, "E")
                    .then(response => response.data)
                    .then((data) => {
                        if (data.code === 0) {
                            swal("Información!", "Los usuarios han sido borrados de manera correcta!", "success");
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

    renderFilterDynamic() {
        try {

            return (
                this.state.filterSettings.map((filter, index) => {
                    let propertyId = `property-${index}`, operadorId = `operador-${index}`, valueId = `value-${index}`
                    return <div className="row FilterCreated" id={index} key={index}>
                        <Form id={index}>
                            <Row id={index}>
                                <Col>
                                    <Form.Control as="select" id={propertyId} data-index={index} className="operador" onChange={this.handleChangeSelectColumn}>
                                        {this.renderListOptions()}
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <Form.Control as="select" id={operadorId} data-index={index} className="operador" onChange={this.handleChangeSelectOperador}>
                                        {this.renderFilterOptions()}
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <Form.Control placeholder="filtro" id={valueId} data-index={index} className="operador" onChange={this.handleChangeValue} value={filter.value} />
                                </Col>
                                <Col>
                                    <ButtonToolbar key={index}>
                                        <Button variant="light" size="sm" className="btnTodos" onClick={this.addfilter}>AND</Button>
                                        <Button variant="light" size="sm" className="btnTodos" onClick={this.addfilter}>OR</Button>
                                        <Button variant="light" size="sm" className="btnTodos" onClick={() => this.deleteFilter(index)}>X</Button>
                                    </ButtonToolbar>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                })

            )

        } catch (error) {
            console.log(error)
        }
    }

    addfilter = (event) => {

        try {

            event.preventDefault();
            if (this.state.filterCreated <= this.state.filterCount) {
                this.setState((prevState) => ({
                    filterSettings: [...prevState.filterSettings, { property: "", value: "", operador: "" }],
                }));
                let count = this.state.filterCreated + 1;
                this.setState({ filterCreated: count });
            } else {
                swal("Información!", "El número de filtros no puede exceder lo permitido!", "info");
            }

        } catch (error) {
            console.log(error);
        }


    }

    deleteFilter(index) {

        try {

            const { filterSettings } = this.state;

            if (filterSettings.length > 1) {
                filterSettings.splice(index, 1);
                let countLess = this.state.filterCreated - 1;
                this.setState({ filterSettings });
                this.setState({ filterCreated: countLess });

            } else {
                swal("Información!", "Debe de existir al menos un filtro!", "info");
            }



        } catch (error) {
            console.log(error);
        }
    }

    handleChangeActionBydelete = (event) => {
        try {
            event.preventDefault();
            console.log(event.target.value);
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { loading } = this.state;
        return (
            <div className="container-fluid" data-panel="containerUsers" id="PanelContainer" key="PanelContainer">
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
                        <div className="card">
                            <div className="card-header tittleContent">
                                <div className="row">
                                    <div className="col-9">
                                        <h2>Usuarios</h2>
                                    </div>
                                    <div className="col-2">
                                        <InputGroup className="mb-3">
                                            <FormControl placeholder="Buscar..." aria-label="Buscar" aria-describedby="basic-addon1" id="buscar" value={this.state.buscar} onChange={this.handleChange} />
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="basic-addon1"><i className="fa fa-search"></i></InputGroup.Text>
                                            </InputGroup.Prepend>
                                        </InputGroup>
                                    </div>
                                    <div className="col-1 pull-right">
                                        <button className="btn btn-primary"><Link to="./crearUsuario">Nuevo</Link></button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 toolBarBtns">
                                        <ButtonToolbar>
                                            <Button variant="light" size="sm" className="btncog" onClick={this.openModal}><i className="fa fa-cog"></i></Button>
                                            <Button variant="light" size="sm" className="btnfilter" onClick={this.colapseFilter}><i className="fa fa-filter"></i></Button>
                                            <Button variant="light" size="sm" className="btnTodos">Todos</Button>
                                        </ButtonToolbar>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <Collapse in={this.state.colapse}>
                                            <div id="example-collapse-text">
                                                <div className="card">
                                                    <div className="card-card-header">
                                                        <ButtonToolbar>
                                                            <Button variant="light" size="sm" className="btnTodos" onClick={this.runFilter}>Run</Button>
                                                            <Button variant="light" size="sm" className="btnTodos" onClick={this.loadData}>Clear</Button>
                                                            <Button variant="light" size="sm" className="btnTodos">Save..</Button>
                                                        </ButtonToolbar>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <p className="textTitleFilter">All of these conditions must be met</p>
                                                        </div>
                                                        {this.renderFilterDynamic()}
                                                    </div>
                                                </div>
                                            </div>
                                        </Collapse>
                                    </div>
                                </div>
                                <table ref={this.tableUser} id="tableUser" className="table table-striped base-table" key="tableUser">
                                    <thead>
                                        <tr key="thTable">{this.renderTableHeader()}</tr>
                                    </thead>
                                    <tbody ref={this.body}>
                                        {this.renderTableData()}
                                    </tbody>
                                </table>
                                <div className="row">
                                    <div className="col-6 DropdownButtonActions">
                                        <DropdownButton id="dropdown-item-button" drop={'right'} title="Selecciones acciones">
                                            <Dropdown.Item as="button" onClick={this.deletedUser}>Eliminar</Dropdown.Item>
                                        </DropdownButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal size="lg" show={this.state.showModal} onHide={this.closeModal} dialogClassName="modal-90w" aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Configuración de vista</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <div className="card">
                                        <div className="card-head colDispo">Columnas Disponibles</div>
                                        <div className="card-body bodyDispo">
                                            <ListGroup id="listModal">
                                                {this.state.keysModal.map((value, index) =>
                                                    <ListGroup.Item key={index} onClick={() => this.KeySeleted(value, index)}>
                                                        {value.trim()}
                                                    </ListGroup.Item>
                                                )}
                                            </ListGroup>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="card">
                                        <div className="card-head colSelect">Columnas Seleccionadas</div>
                                        <div className="card-body bodySelect">
                                            <ListGroup id="listModal">
                                                {this.state.keysSelected.map((value, index) =>
                                                    <ListGroup.Item key={index} onClick={() => this.removeKeySeleted(value, index)}>
                                                        <span className="btnTitle">{value.trim()}</span>
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
                            <Button variant="light" size="sm" onClick={this.closeModal}>Cancelar</Button>
                            <Button variant="primary" size="sm" onClick={this.saveOrden} >Guardar</Button>
                        </ButtonToolbar>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default usuarios;