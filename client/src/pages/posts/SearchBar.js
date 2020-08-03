import React, {Component} from 'react'
import Button from "react-bootstrap/Button";

export default class SearchBar extends Component {
    render() {
        return (
            <div>
                <label>search form:</label>
                <input
                    type="text"
                    placeholder="type here..."
                    value={this.props.inputString}
                    onChange={this.props.onInputChange}
                />
                <Button
                    onClick={this.props.btnClick}
                    variant={"primary"}
                    disabled={this.props.inputString.length !== 0}>
                    Search
                </Button>
            </div>
        )
    }
}