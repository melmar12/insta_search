import React, {Component} from 'react'
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import defaultImg from "./imgs/default-img.png"
import usrImg from "./icons/usr.svg"

export default class SearchResults extends Component {
	render() {
		return (
			<Row>
			{(Object.keys(this.props.data).length > 0) ? Object.keys(this.props.data).map(key => (
				<Card key={key} style={{ width: '18rem' }}>
					<Card.Body>
						<Row>
							<Col sm="2" className="justify-content-md-center">
						    	<img className="usrImg" src={usrImg}/>
						    </Col>
						    <Col sm="10">
								<Card.Title>{this.props.data[key].username}</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">{this.props.data[key].location}</Card.Subtitle>
							</Col>
						</Row>
						<Card.Img variant="top" src={defaultImg} />
						{this.props.data[key].hashtags.map(function(item, i){
						return <Card.Link href="#" key={i}>#{item}</Card.Link>})}
					</Card.Body>
				</Card>
			)): <div>no results found</div>}
			</Row>
		)
	}
}
