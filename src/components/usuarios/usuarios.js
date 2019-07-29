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
import Progress from "react-progress-2";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import createFilter from './../../helpers/filter';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import swal from 'sweetalert';
//import $ from 'jquery';


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
            filtersDb: [],
            filterSettings: [{ property: "", value: "", operador: "" }],
            filterCount: 0,
            filterCreated: 1,
            buscar: '',
            colapse: false,
            showModal: false,
            loading: false,
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
                swal("Información!", "Se debe se seleccionar al menos opción!", "info");
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
                        this.countFilter();
                        this.getFiltersDb();
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

    getFiltersDb() {

        try {

            user.getFilterbyDataType("varchar")
                .then(response => response.data)
                .then((data) => {
                    if (data.code === 0) {
                        this.setState({ filtersDb: data.filters })
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
                    return <th key={index}>{key.trim()}</th>

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
                if (index === 0) {
                    return <td key={index}>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="checkId" />
                            <Link to={`/actualizarUsuario/${value}`}>{value}</Link>
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

            Progress.show();
            const { filterSettings } = this.state;
            let index = event.target.dataset.index;
            filterSettings[index].property = event.target.value;
            this.setState({ filterSettings });
            let id = event.target.id;

            user.getFilterbyDataType("int")
                .then(response => response.data)
                .then((data) => {
                    if (data.code === 0) {
                        this.changeFilterOPTIONS(id, data.filters)
                        this.forceUpdate();
                        Progress.hide();

                    }
                })
                .catch((err) => {
                    console.log(err);
                    Progress.hide();
                });

        } catch (error) {
            console.log(error)
        }

    };

    changeFilterOPTIONS(id, data) {
        try {

            this.setState({ filtersDb: data });
            //let jq = `#${id}`;
            //let jquery= $(jq);
            //jquery.empty();
            //let select= $('#operador-0');
            //select.empty();

            //data.map((filter, index) => {
            //(
            //select.append(<option key={filter.descriptionING}>{filter.descriptionING}</option>)
            //)
            //})

        } catch (error) {
            console.log(error)
        }
    }

    handleChangeSelectOperador = (event) => {

        try {

            const { filterSettings } = this.state;
            let index = event.target.dataset.index;
            filterSettings[index].operador = event.target.value;
            this.setState({ filterSettings });

        } catch (error) {
            console.log(error)
        }

    };

    handleChangeValue = (event) => {

        try {

            const { filterSettings } = this.state;
            let index = event.target.dataset.index;
            filterSettings[index].value = event.target.value;
            this.setState({ filterSettings });

        } catch (error) {
            console.log(error);
        }

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
                    var filtersValuesJSON = { property: filtercolum, value: filterValue, operador: filterOperador };
                    array.push(filtersValuesJSON);
                    var filtersCreated = this.state.filterSettings;
                    await this.setState({ filterSearch: filtersCreated });
                    //const { filterSearch } = this.state;
                    const { filterSettings } = this.state;
                    datos = datos.filter(createFilter(...filterSettings));
                    this.setState({ users: datos });
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
                            this.setState({ users: data.users, filterCount: 0, filterCreated: 0 });
                            this.getItemHeader(data.users[0]);
                            this.getOptionsModal(data.users[0]);
                            this.countFilter();
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

    renderFilterDynamic() {
        try {

            return (
                this.state.filterSettings.map((filter, index) => {
                    let propertyId = `property-${index}`, operadorId = `operador-${index}`, valueId = `value-${index}`
                    return <div className="row FilterCreated" id={index} key={index}>
                        <Form id={index}>
                            <Row id={index}>
                                <Col>
                                    <Form.Control as="select" id={propertyId} data-index={index} className="property" onChange={this.handleChangeSelectColumn} value={filter.property}>
                                        {this.renderListOptions()}
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <Form.Control as="select" id={operadorId} data-index={index} className="operador" onChange={this.handleChangeSelectOperador} value={filter.operador}>
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
        return (
            <div className="container-fluid" data-panel="containerUsers" id="PanelContainer" key="PanelContainer">
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
                                <table ref={this.table} className="table table-striped base-table" key="tableUser">
                                    <thead>
                                        <tr key="thTable">{this.renderTableHeader()}</tr>
                                    </thead>
                                    <tbody ref={this.body}>
                                        {this.renderTableData()}
                                    </tbody>
                                </table>
                                <div className="row">
                                    <div className="col-6 DropdownButtonActions">
                                        <DropdownButton id="dropdown-item-button" 
                                                        drop={'right'}
                                                        title="Selecciones acciones">
                                            <Dropdown.Item as="button">Eliminar</Dropdown.Item>
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
                <Progress.Component style={{ background: 'orange' }} thumbStyle={{ background: 'green' }} />
            </div>
        );
    }
}

export default usuarios;