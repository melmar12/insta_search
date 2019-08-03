
import React, {Component} from 'react'
import axios from 'axios'

export default class Posts extends Component {
	constructor(props) {
		super(props)

		this.onChangeSearch = this.onChangeSearch.bind(this)
		this.onSubmit = this.onSubmit.bind(this)

		this.isLocation = this.isLocation.bind(this)
		this.isUsername = this.isUsername.bind(this)
		this.isHashtag = this.isHashtag.bind(this)

		this.state = {
			queryString: "",
			username: "",
			location: "",
			tags: [],
			data: {
				0: {
					username: "reults will appear here",
					location: "",
					hashtags: []
				}
			}
		}
	}

	onChangeSearch(e) {
		this.setState({
			queryString: e.target.value
		})

		let query = this.state.queryString
		console.log(query)

		if(query[0] === '#')
			console.log(query + ' is a hashtag')
		else 
			console.log('pick as hashtag, location or username')

		console.log(this)
	}
	isLocation(e){
		e.target.checked = false;

		this.setState({
			location: this.state.queryString,
			queryString: ""
		})
	}
	isUsername(e){
		e.target.checked = false;

		this.setState({
			username: this.state.queryString,
			queryString: ""
		})	
	}
	isHashtag(e){
		e.target.checked = false;

		let tempArr = this.state.tags
		tempArr.push(this.state.queryString)
		this.setState({
			tags: tempArr,
			queryString: ""
		})

		console.log(tempArr)
		console.log(this.state.tags)
	}
	// note: could combine all three to "handleChecked" function

	onSubmit(e) {
		e.preventDefault()

		let query = '{}'; 
		let that = this
		axios.get('http://localhost:4000/posts/search/' + query)
            .then(function(res){ 
            	//console.log(res.data[0].username)
            	that.setState({
					data: res.data
				})
        })
		console.log(this.state.data[0].username)
	} 
	 

	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<label>search criteria</label>
					<ul>
						<li>location: {this.state.location}</li>
						<li>username: {this.state.username}</li>
						<li>hashtags:
							<ul>
							{this.state.tags.map(function(item, i){
								return <li key={i}>{item}</li>})
							}
							</ul>
						</li>
					</ul>
					<div>
						<label>search form:</label>
						<input
							type="text"
							placeholder="type here..."
							value={this.state.queryString}
							onChange={this.onChangeSearch}
							/>
					<div>
						<input type="submit" value="Submit"/>
					</div>
					</div>
					<div>
						<label>choose one:</label>
						<label>
							<input type="checkbox" onChange={this.isLocation}/>
							<span>location: {this.state.queryString}</span>
						</label>
					</div>
					<div>
						<label>
							<input type="checkbox" onChange={this.isUsername}/>
							<span>username: {this.state.queryString}</span>
						</label>
					</div>
					<div>
						<label>
							<input type="checkbox" onChange={this.isHashtag}/>
							<span>hashtag: {this.state.queryString}</span>
						</label>
					</div>
				</form>
				<div>
					<ul>
					{Object.keys(this.state.data).map(key => (
						<li key={key}>{this.state.data[key].username}</li>
					))}
					</ul>
				</div>
			</div>
		)
	}

}