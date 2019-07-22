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
//import Moment from 'react-moment';
import 'moment-timezone';
import Progress from "react-progress-2";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


class grupos extends Component {

    constructor(props) {
        super(props)
        this.state = {
            groups: [],
            keys: [],
            keysModal: [],
            optionsModal: [],
            keysSelected: [],
            operadores: [{ name: "Start With", value: "startWith" }, { name: "is", value: "is" }],
            buscar: '',
            colapse: false,
            showModal: false,
            alert: false,
            msg: '',
            inicio: 'Inicio',
            modulo: 'Gestión Usuarios',
            componente: 'Grupos'
        }

        this.table = React.createRef();
        this.body = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.colapseFilter = this.colapseFilter.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveOrden = this.saveOrden.bind(this);
        this.KeySeleted = this.KeySeleted.bind(this);
        this.removeKeySeleted = this.removeKeySeleted.bind(this);
    }

    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value });
        console.log(this.state.buscar);
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
                user.getQueryRolFilter(query)
                    .then(response => response.data)
                    .then((data) => {
                        if (data.code === 0) {
                            this.setState({ groups: data.groups, showModal: false });
                            this.getItemHeader(data.groups[0]);
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

            user.getgroups()
                .then(response => response.data)
                .then((data) => {
                    if (data.code === 0) {
                        this.setState({ groups: data.groups });
                        this.getItemHeader(data.groups[0]);
                        this.getOptionsModal(data.groups[0]);
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

            if (this.state.groups.length > 0) {
                let header = Object.keys(this.state.groups[0]);
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

            if (this.state.groups.length > 0) {
                return this.state.groups.map((group, index) => {
                    return (
                        <tr key={group.groupId}>
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

            let header = Object.keys(this.state.groups[0]);
            return header.map((key, index) => {
                return <td key={index}>{this.state.groups[indice][key]}</td>
            })

        } catch (error) {
            console.log(error);
        }


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
            header.map((key, index) => {
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
            keysModal.map((key, index) => {
                array.push(key);
                return null;
            });

            this.setState({ optionsModal: array, keysModal: array });

        } catch (error) {
            console.log(error);
        }
    }

    renderListModal() {

        try {

            if (this.state.groups.length > 0) {
                let header = Object.keys(this.state.groups[0]);
                return header.map((key, index) => {
                    return <ListGroup.Item key={index} onClick={() => this.removeKeySeleted(key)}>
                        {key.trim()}
                    </ListGroup.Item>
                })
            }

        } catch (error) {
            console.log(error);
        }

    }

    renderListOptions() {
        try {

            let header = Object.keys(this.state.groups[0]);
            return header.map((key, index) => {
                return (
                    <option key={index}>{key}</option>
                )
            })

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

    renderFilter() {
        try {

            return (
                <Form>
                    <Row>
                        <Col>
                            <Form.Control as="select">
                                {this.renderListOptions()}
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Control as="select">
                                {this.renderFilterOptions()}
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Control as="select">
                                {this.renderListOptions()}
                            </Form.Control>
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
            <div className="container-fluid" data-panel="containerGroups">
                <div className="row">
                    <div className="col-12">
                        <Breadcrum inicio={this.state.inicio} modulo={this.state.modulo} componente={this.state.componente} />
                    </div>
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-8">
                                        <h2>Grupos</h2>
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
                                                            <Button variant="light" size="sm" className="btnTodos">Run</Button>
                                                            <Button variant="light" size="sm" className="btnTodos">Save..</Button>
                                                            <Button variant="light" size="sm" className="btnTodos">AND</Button>
                                                            <Button variant="light" size="sm" className="btnTodos">OR</Button>
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

                <Modal
                    size="lg"
                    show={this.state.showModal}
                    onHide={this.closeModal}
                    dialogClassName="modal-90w"
                    aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Configuración de vista
                   </Modal.Title>
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
                                                        <span className="btnArrow">
                                                            <i className="fa fa-arrow-alt-circle-up" />
                                                        </span>
                                                        <span className="btnArrow">
                                                            <i className="fa fa-arrow-alt-circle-down" />
                                                        </span>
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



export default grupos;