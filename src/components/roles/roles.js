import React, { Component } from 'react';
import { userService as user } from './../../services/user.services';
import Moment from 'react-moment';
import 'moment-timezone';

class roles extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rols: []
        }
    }

    componentDidMount() {

        user.getrols()
            .then(response => response.data)
            .then((data) => {
                if (data.code === 0) {
                    this.setState({
                        rols: data.rols
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });

    }

    renderTableData() {
        return this.state.rols.map((rol, index) => {
            const { rolId, rolName, state, createdBy, created, updates, updateBy, updated } = rol
            return (
                <tr key={rolId}>
                    <td>{rolName}</td>
                    <td>{state}</td>
                    <td>{createdBy}</td>
                    <td><Moment format="YYYY/MM/DD">{created}</Moment></td>
                    <td>{updates}</td>
                    <td>{updateBy}</td>
                    <td><Moment format="YYYY/MM/DD">{updated}</Moment></td>
                </tr>
            )
        })
    }


    render() {
        return (
            <div className="container-fluid" data-panel="containerRoles">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h2>Rols</h2>
                            </div>
                            <div className="card-body">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Activo</th>
                                            <th>Creado Por</th>
                                            <th>created</th>
                                            <th>updates</th>
                                            <th>Actualizado Por</th>
                                            <th>updated</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderTableData()}
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default roles;