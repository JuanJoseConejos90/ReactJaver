import React, { Component } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';


class Breadcrum extends Component {
    render() {
        return (
            <Breadcrumb className="navegacionItem">
                <Breadcrumb.Item>{this.props.inicio}</Breadcrumb.Item>
                <Breadcrumb.Item>{this.props.modulo}</Breadcrumb.Item>
                <Breadcrumb.Item>{this.props.componente}</Breadcrumb.Item>
            </Breadcrumb>
        );
    }
}

export default Breadcrum;


