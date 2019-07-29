import React, { Component } from "react";
import { userService as user } from './../../services/user.services';
import Breadcrum from './../ui/Breadcrum';
import 'moment-timezone';
import Progress from "react-progress-2";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "./../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

class roles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rols: [],
      inicio: "Inicio",
      modulo: "Gestión Usuarios",
      componente: "Roles"
    };
  }

  componentDidMount(){

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

  renderTable(){

    try {
        
        if (this.state.rols.length > 0) {
            let header = Object.keys(this.state.rols[0]);
            return header.map((key, index) => {
                let iskeyid= (index===0) ? true : false;
                return <TableHeaderColumn dataField={key} isKey={iskeyid}>{key}</TableHeaderColumn>
            })
        }

    } catch (error) {
        console.log(error)
    }
  }

  render() {
    return <div className="container-fluid" data-panel="containerRoles">
                <div className="row">
                    <div className="col-12">
                        <Breadcrum inicio={this.state.inicio} modulo={this.state.modulo} componente={this.state.componente} />
                    </div>
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header tittleContent">
                                <div className="col-12">
                                    <h2>Roles</h2>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                     <BootstrapTable data={this.state.rols} pagination>
                                          <TableHeaderColumn dataField='rolId' isKey>rolId</TableHeaderColumn>
                                          <TableHeaderColumn dataField='rolName'>rolName</TableHeaderColumn>
                                          <TableHeaderColumn dataField='state'>state</TableHeaderColumn>
                                          <TableHeaderColumn dataField='createdBy'>createdBy</TableHeaderColumn>
                                          <TableHeaderColumn dataField='created'>created</TableHeaderColumn>
                                          <TableHeaderColumn dataField='updates'>updates</TableHeaderColumn>
                                          <TableHeaderColumn dataField='updateBy'>updateBy</TableHeaderColumn>
                                          <TableHeaderColumn dataField='updated'>updated</TableHeaderColumn>
                                    </BootstrapTable>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Progress.Component style={{ background: 'orange' }} thumbStyle={{ background: 'green' }} />
           </div>
  }
}

export default roles;
