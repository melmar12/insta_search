import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class Example extends React.Component {
  handleClick() {
    console.log("test handle click")
  }
  render() {
    return (
      <ListGroup>
        <ListGroupItem onClick={this.handleClick}>Cras justo odio</ListGroupItem>
        <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
        <ListGroupItem>Morbi leo risus</ListGroupItem>
        <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
        <ListGroupItem>Vestibulum at eros</ListGroupItem>
      </ListGroup>
    );
  }
}