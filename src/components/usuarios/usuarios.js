import React, { Component } from 'react';
import { userService as user } from './../../services/user.services';
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
import Progress from "react-progress-2";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import createFilter from './../../helpers/filter';


class usuarios extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            keys: [],
            keysModal: [],
            optionsModal: [],
            keysSelected: [],
            operadores: [{ name: "Is", value: "Is" }, { name: "startWith", value: "startWith" }, { name: "endWith", value: "endWith" },
            { name: "contain", value: "contain" }, { name: "Notcontain", value: "Notcontain" }, { name: "empty", value: "empty" },
            { name: "Notempty", value: "Notempty" }, { name: "greater or equal", value: "greater or equal" }, { name: "less or equal", value: "less or equal" }],
            filters: [{ property: "firstName", value: "A", operador: "startWith" }, { property: "state", value: "I", operador: "Is" }],
            filterSearch: [],
            filterCreated: [{ property: "", value: "", operador: "" }],
            filtrosDinamicos: [{ name: "", age: "" }],
            buscar: '',
            filterOperador: '',
            filterColum: '',
            filterValue: '',
            colapse: false,
            showModal: false,
            alert: false,
            loading: false,
            msg: '',
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
    }


    handleChange = (event) => {

        try {


            this.setState({ buscar: event.target.value });
            var usersFilters = this.state.users;
            usersFilters = usersFilters.filter((item => {
                return item.firstName.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
            }));

            this.setState({ users: usersFilters });

        } catch (error) {
            console.log(error);
        }

    };

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

                Progress.show();
                var arrayOfStrings = this.state.keysSelected;
                var query = arrayOfStrings.join();
                user.getQueryUserFilter(query)
                    .then(response => response.data)
                    .then((data) => {
                        if (data.code === 0) {
                            this.setState({ users: data.users, showModal: false });
                            this.getItemHeader(data.users[0]);
                            this.forceUpdate();
                            Progress.hide();

                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        Progress.hide();
                    });

            } else {
                Progress.show();
                this.setState({ showModal: false, msg: 'Se debe se seleccionar al menos opción', alert: true });
                Progress.hide();
            }

        } catch (error) {
            console.log(error);
        }

    };

    componentDidMount() {

        try {

            Progress.show();
            user.getusers()
                .then(response => response.data)
                .then((data) => {
                    if (data.code === 0) {
                        this.setState({ users: data.users });
                        this.getItemHeader(data.users[0]);
                        this.getOptionsModal(data.users[0]);
                        Progress.hide();
                    }
                })
                .catch((err) => {
                    Progress.hide();
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
                    return <th key={index}>{key.trim()}</th>

                })
            }

        } catch (error) {
            console.log(error)
        }

    }

    renderTableData() {

        try {

            if (this.state.users.length > 0) {
                return this.state.users.map((user, index) => {
                    return (
                        <tr key={user.userId}>
                            {this.renderRows(index)}
                        </tr>
                    )
                })
            }

        } catch (error) {
            console.log(error);
        }
    }

    renderRows(indice) {

        try {

            let header = Object.keys(this.state.users[0]);
            return header.map((key, index) => {
                var value = (this.isDate(this.state.users[indice][key]) ? this.parseMoment(this.state.users[indice][key]) : this.state.users[indice][key])
                return <td key={index}>{value}</td>
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
                array.push(key);
                return null;
            });

            this.setState({ keys: array });

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

    renderListOptions() {
        try {

            if (this.state.users.length > 0) {
                let header = Object.keys(this.state.users[0]);
                return header.map((key, index) => {
                    return (
                        <option key={index}>{key}</option>
                    )
                })
            }


        } catch (error) {
            console.log(error);
        }
    }

    renderFilterOptions() {
        try {

            return this.state.operadores.map((filter, index) => {
                return (
                    <option key={index} value={filter.value}>{filter.name}</option>
                )
            })

        } catch (error) {
            console.log(error);
        }
    }

    handleChangeSelectOperador = (event) => {
        this.setState({ filterOperador: event.target.value });
    };

    handleChangeSelectColumn = (event) => {
        this.setState({ filterColum: event.target.value });
    };

    handleChangeValue = (event) => {
        this.setState({ filterValue: event.target.value.toUpperCase() });
    };

    async runFilter(event) {

        try {


            if (this.state.users.length > 0) {

                try {

                    event.preventDefault();
                    Progress.show();
                    var datos = this.state.users;
                    var filtercolum = this.state.filterColum;
                    var filterOperador = this.state.filterOperador;
                    var filterValue = this.state.filterValue;
                    let array = [];
                    if (filtercolum !== "" && filterOperador !== "" && filterValue !== "") {
                        var filtersValuesJSON = { property: filtercolum, value: filterValue, operador: filterOperador };
                        array.push(filtersValuesJSON);
                        await this.setState({ filterSearch: array });
                        const { filterSearch } = this.state;
                        datos = datos.filter(createFilter(...filterSearch));
                        this.setState({ users: datos });

                    }

                    Progress.hide();


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

            if (this.state.users.length > 0) {
                event.preventDefault();
                Progress.show();
                user.getusers()
                    .then(response => response.data)
                    .then((data) => {
                        if (data.code === 0) {
                            this.setState({ users: data.users });
                            this.getItemHeader(data.users[0]);
                            this.getOptionsModal(data.users[0]);
                            Progress.hide();
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        Progress.hide();
                    });
            }



        } catch (error) {
            console.log(error);
        }

    };

    renderFilter() {
        try {

            return (
                <Form>
                    <Row>
                        <Col>
                            <Form.Control as="select" onChange={this.handleChangeSelectColumn} value={this.state.filterColum}>
                                {this.renderListOptions()}
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Control as="select" onChange={this.handleChangeSelectOperador} value={this.state.filterOperador}>
                                {this.renderFilterOptions()}
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Control placeholder="filtro" onChange={this.handleChangeValue} value={this.state.filterValue} />
                        </Col>
                        <Col>
                            <ButtonToolbar>
                                <Button variant="light" size="sm" className="btnTodos">AND</Button>
                                <Button variant="light" size="sm" className="btnTodos">OR</Button>
                                <Button variant="light" size="sm" className="btnTodos">X</Button>
                            </ButtonToolbar>
                        </Col>
                    </Row>
                </Form>
            )

        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div className="container-fluid" data-panel="containerUsers">
                <div className="row">
                    <div className="col-12">
                        <Breadcrum inicio={this.state.inicio} modulo={this.state.modulo} componente={this.state.componente} />
                    </div>
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-8">
                                        <h2>Usuarios</h2>
                                    </div>
                                    <div className="col-2">
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="Buscar..."
                                                aria-label="Buscar"
                                                aria-describedby="basic-addon1"
                                                id="buscar"
                                                value={this.state.buscar}
                                                onChange={this.handleChange}
                                            />
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="basic-addon1"><i className="fa fa-search"></i></InputGroup.Text>
                                            </InputGroup.Prepend>
                                        </InputGroup>
                                    </div>
                                    <div className="col-2">
                                        <button className="btn btn-primary">Nuevo</button>
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
                                                        <div className="row">
                                                            {this.renderFilter()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Collapse>
                                    </div>
                                </div>
                                <table ref={this.table} className="table table-striped base-table">
                                    <thead>
                                        <tr>{this.renderTableHeader()}</tr>
                                    </thead>
                                    <tbody ref={this.body}>
                                        {this.renderTableData()}
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer"></div>
                        </div>
                    </div>
                </div>
                <Progress.Component style={{ background: 'orange' }} thumbStyle={{ background: 'green' }} />
                <Modal
                    size="lg"
                    show={this.state.showModal}
                    onHide={this.closeModal}
                    dialogClassName="modal-90w"
                    aria-labelledby="contained-modal-title-vcenter">
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
                <Progress.Component style={{ background: 'orange' }} thumbStyle={{ background: 'green' }} />
                <SweetAlert
                    show={this.state.alert}
                    title="Información"
                    text={this.state.msg}
                    onConfirm={() => this.setState({ alert: false })}
                />
            </div>
        );
    }
}

export default usuarios;