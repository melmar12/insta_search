import React, {Component} from 'react'
import ListGroup from "react-bootstrap/ListGroup"
import usrIcon from "./icons/usr2.svg"
import locIcon from "./icons/loc.svg"

export default class SearchCriteria extends Component {

    render() {
        return (
            <div>
                <ListGroup horizontal className="searchCriteria">
                {this.props.query.username.length > 0 ? 
                    <ListGroup.Item><img className="mini-icon" src={usrIcon}/>{this.props.query.username}</ListGroup.Item>
                : ''}
                {this.props.query.location.length > 0 ? 
                    <ListGroup.Item><img className="mini-icon" src={locIcon}/>{this.props.query.location}</ListGroup.Item>
                : ''}
                {this.props.query.hashtags.length > 0 ? this.props.query.hashtags.map(function(item, i){
                        return <ListGroup.Item key={i}>#{item}</ListGroup.Item>})
                : ''}
                </ListGroup>
            </div>
        )
    }
}