
import React, {Component} from 'react'
import axios from 'axios'

export default class Posts extends Component {
	//
	constructor(props) {
		super(props)

		this.onChangeSearch = this.onChangeSearch.bind(this)
		this.onSubmit = this.onSubmit.bind(this)

		this.isLocation = this.isLocation.bind(this)
		this.isUsername = this.isUsername.bind(this)
		this.isHashtag = this.isHashtag.bind(this)

		this.state = {
			queryString: "housto",
			username: "",
			location: "",
			tags: []
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
			// display options to choose... 

		console.log(this)



		// need to track whats a hashtag and whats not
		// if all that remains are astags display results
		// if not a hastag, display locations and users matching the word & hashtag!
		// there's no location or username models in db yet, so just display it lol
		// add hashtags, location, user in state
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
	// could combine all three to "handleChecked" function

	onSubmit(e) {
		e.preventDefault()

		let query = ""; 

		axios.get('http://localhost:4000/posts/search/' + query)
            .then(res => console.log(res.data))
		
		this.setState({
			queryString: 'subtmitted'
		})
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
			</div>
		)
	}

}