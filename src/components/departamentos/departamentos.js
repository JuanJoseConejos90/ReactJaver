import React, { Component } from 'react';
import { userService as user } from './../../services/user.services';
import { Link } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Breadcrum from './../ui/Breadcrum';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Moment from 'react-moment';
import 'moment-timezone';
import { ClassicSpinner } from "react-spinners-kit";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class departamentos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            buscar: '',
            alert: false,
            loading: false,
            colapse: false,
            showModal: false,
            inicio: 'Inicio',
            modulo: 'Gestión Usuarios',
            componente: 'Departamentos'
        };

        this.handleChange = this.handleChange.bind(this);
        this.colapseFilter = this.colapseFilter.bind(this);

    }

    componentDidMount() {
        try {
            this.getAllDepartments();

        } catch (error) {
            console.log(error);
        }
    }

    getAllDepartments() {
        try {

            this.setState({ loading: true });
            user
                .getDepartments()
                .then(response => response.data)
                .then(data => {
                    setTimeout(() => {
                        this.setState({ departments: data.departments })
                        this.setState({ loading: false });
                    }, 5000);
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ loading: false });
                });

        } catch (error) {
            console.log(error);
            this.setState({ loading: false });
        }
    }

    renderTableHeader() {

        try {

            if (this.state.departments.length > 0) {
                let header = Object.keys(this.state.departments[0]);
                return header.map((key, index) => {
                    return <th key={index}>{key.trim()}</th>

                })
            }

        } catch (error) {
            console.log(error);
        }
    }

    renderTableData() {

        try {

            if (this.state.departments.length > 0) {
                return this.state.departments.map((department, index) => {
                    return (
                        <tr key={department.departmentId}>
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

            let header = Object.keys(this.state.departments[0]);
            return header.map((key, index) => {
                var value = (this.isDate(this.state.departments[indice][key]) ? this.parseMoment(this.state.departments[indice][key]) : this.state.departments[indice][key]);
                var path = "/actualizarCompany/" + value;
                if (index === 0) {
                    return <td key={index}>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="checkId" />
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

    //Functions Events
    handleChange = (event) => {

        try {

            event.preventDefault();
            console.log(event.target.value);

        } catch (error) {
            console.log(error)
        }

    };

    colapseFilter = () => {
        this.setState({
            colapse: !this.state.colapse
        });
    };



    render() {
        const { loading } = this.state;
        return (
            <div className="container-fluid" data-panel="containerDepartments">
                <div className="row loading">
                    <ClassicSpinner size={100} color="#268EFC" loading={loading} />
                </div>
                <div className="row">
                    <div className="col-12">
                        <Breadcrum inicio={this.state.inicio} modulo={this.state.modulo} componente={this.state.componente} />
                    </div>
                </div>
                <div className="col-12">

                    <div className="card">

                        <div className="card-header tittleContent">
                            <div className="row">
                                <div className="col-9">
                                    <h2>Departamentos</h2>
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
                                    <button className="btn btn-primary"><Link to="./crearDepartamentos">Nuevo</Link></button>
                                </div>

                            </div>
                        </div>

                        <div className="card-body">

                            <div className="row">
                                <div className="col-12 toolBarBtns">
                                    <ButtonToolbar>
                                        <Button variant="light" size="sm" className="btncog"><i className="fa fa-cog"></i></Button>
                                        <Button variant="light" size="sm" className="btnfilter"><i className="fa fa-filter"></i></Button>
                                        <Button variant="light" size="sm" className="btnTodos">Todos</Button>
                                    </ButtonToolbar>
                                </div>
                            </div>

                            <div className="row">
                                <table ref={this.table} className="table table-striped base-table" key="tableUser">
                                    <thead>
                                        <tr key="thTable">{this.renderTableHeader()}</tr>
                                    </thead>
                                    <tbody ref={this.body}>
                                        {this.renderTableData()}
                                    </tbody>
                                </table>
                            </div>

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
        );
    }
}

export default departamentos;