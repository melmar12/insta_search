import React, {Component} from 'react'
import axios from 'axios'
import Col from "react-bootstrap/Col"
import SearchBar from "./SearchBar"
import SearchCriteria from "./SearchCriteria"
import SearchType from "./SearchType"
import SearchResults from "./SearchResults"
import Hint from "./Hint"


export default class Posts extends Component {
	constructor(props) {
		super(props)

		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
		this.updateQuery = this.updateQuery.bind(this)
		this.loadData = this.loadData.bind(this)


		this.state = {
			data: {},
			inputString: "",
			query: {
				username: "",
				location: "",
				hashtags: []
			}
		}
		this.loadData()
	}

	handleInputChange(e) {
		this.setState({
			inputString: e.target.value
		})
	}

	loadData(){
		let that = this
		axios.get('/posts')
	        .then(function(res){ 
	        	that.setState({
					data: res.data
			})
        })
	}

	handleSearch(){
		let query = JSON.stringify(this.state.query)
		let that = this

		console.log(query)

		axios.get('/posts/search/' + query)
            .then(function(res){ 
            	that.setState({
					data: res.data
				})
        })
	}

	updateQuery(newQuery){
		this.setState({
			query: newQuery,
			inputString: ""
		})
	}

	render() {
		return (
			<Col className="posts" lg="10">
				<SearchCriteria
					query={this.state.query}
					location={this.state.location}
					username={this.state.username}
					tags={this.state.tags} />
				<SearchBar
					inputString={this.state.inputString}
					onInputChange={this.handleInputChange}
					btnClick={this.handleSearch} />
				<Hint/>
				<SearchType
					query={this.state.query}
					updateQuery={this.updateQuery}
					inputString={this.state.inputString}/>
				<SearchResults
					data={this.state.data} />
			</Col>
		)
	}
}