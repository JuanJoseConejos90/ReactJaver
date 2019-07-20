import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

class filterTable extends Component {

    renderListOptions() {
        try {

            return this.props.options.map((key, index) => {
                return (
                    <option key={index}>{key}</option>
                )
            })

        } catch (error) {
            console.log(error);
        }
    }

    renderListOperadores() {
        try {

            return this.props.operadores.map((filter, index) => {
                return (
                    <option key={index} value={filter.value}>{filter.name}</option>
                )
            })

        } catch (error) {
            console.log(error);
        }
    }

    addFilterTable = (event) => {

        try {

            event.preventDefault();
            this.props.addFilterTable();

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <Form>
                <Row key={this.props.index}>
                    <Col>
                        <Form.Control as="select" value={this.props.filters.property}>
                            {this.renderListOptions()}
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Control as="select" value={this.props.filters.operador}>
                            {this.renderListOperadores()}
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Control placeholder="filtro" value={this.props.filters.operador} />
                    </Col>
                    <Col>
                        <ButtonToolbar>
                            <Button variant="light" size="sm" className="btnTodos" onClick={this.addFilterTable}>AND</Button>
                            <Button variant="light" size="sm" className="btnTodos">OR</Button>
                            <Button variant="light" size="sm" className="btnTodos">X</Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default filterTable;