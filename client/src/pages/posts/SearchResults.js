import React, {Component} from 'react'

export default class SearchResults extends Component {
	render() {
		return (
			<div>
				<ul>
					{(Object.keys(this.props.data).length > 0) ? Object.keys(this.props.data).map(key => (
						<li key={key}>
							<ul>
								<li>user: {this.props.data[key].username}</li>
								<li>location: {this.props.data[key].location}</li>
								<li>tags: {this.props.data[key].hashtags}</li>
							</ul>
						</li>
					)): <li>no results found</li>}
				</ul>
			</div>
		)
	}
}
