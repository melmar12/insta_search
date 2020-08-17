import React, {Component} from 'react'
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

export default class SearchBar extends Component {
    render() {
        return (
            <Row>
            <Col column sm="10"> 
                <input
                    type="text"
                    placeholder="type here..."
                    value={this.props.inputString}
                    onChange={this.props.onInputChange}/>
                </Col>
                <Col column sm="2">
                <Button
                    onClick={this.props.btnClick}
                    variant={"primary"}
                    disabled={this.props.inputString.length !== 0}>
                    Search
                </Button>
                </Col>
            </Row>
        )
    }
}