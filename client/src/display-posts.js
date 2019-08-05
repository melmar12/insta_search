
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
		this.hadnleSearch = this.handleSearch.bind(this)

		this.state = {
			queryString: "",
			username: "",
			location: "",
			tags: [],
			data: {
				// 0: {
				// 	username: "",
				// 	location: "",
				// 	hashtags: []
				// }
			}
		}
		this.handleSearch()
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

	handleSearch(){
		let username = this.state.username
		let location = this.state.location
		let tags = this.state.tags

		// convert state to a search query (json string)
		let query = {}
		if(username)
			query["username"] = username
		if(location)
			query["location"] = location
		if(tags.length > 0)
			query["hashtags"] = tags
		query = JSON.stringify(query)

		console.log("query made: " + query)

		// api call
		let that = this
		axios.get('http://localhost:4000/posts/search/' + query)
            .then(function(res){ 
            	that.setState({
					data: res.data
				})
        })
        console.log('result:')
		console.log(this.state.data)
		console.log(Object.keys(this.state.data).length + ' result(s) returned')
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
		let tagStr = this.state.queryString
		let tempArr = this.state.tags

		if(tagStr[0] === '#')
			tagStr = tagStr.replace('#','')

		tempArr.push(tagStr)
		this.setState({
			tags: tempArr,
			queryString: ""
		})

		console.log('"'+tagStr+'" added to tags state.')
		console.log(this.state.tags)
	}
	// note: could combine all three to "handleSelection" function

	onSubmit(e) {
		e.preventDefault()
		this.handleSearch()
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
						<input type="submit" value="Search"/>
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
					{(Object.keys(this.state.data).length > 0) ? Object.keys(this.state.data).map(key => (
						<li key={key}>
							<ul>
								<li>user: {this.state.data[key].username}</li>
								<li>location: {this.state.data[key].location}</li>
								<li>tags: {this.state.data[key].hashtags}</li>
							</ul>
						</li>
					)): <li>no results found</li>}
					</ul>
				</div>
			</div>
		)
	}

}