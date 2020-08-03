
import React, {Component} from 'react'
import axios from 'axios'
import SearchBar from "./SearchBar";
import SearchCriteria from "./SearchCriteria";
import SearchType from "./SearchType";
import SearchResults from "./SearchResults";

export default class Posts extends Component {
	constructor(props) {
		super(props)

		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
		this.updateQuery = this.updateQuery.bind(this)

		this.state = {
			data: {},
			inputString: "",
			query: {
				username: "",
				location: "",
				hashtags: []
			}
		}
		this.handleSearch()
	}

	handleInputChange(e) {
		this.setState({
			inputString: e.target.value
		})

		// let input = this.state.inputString
		// console.log(input)
		//
		// if(input[0] === '#')
		// 	console.log(input + ' is a hashtag')
		// else
		// 	console.log('pick as hashtag, location or username')
		//
		// console.log(this)
	}

	handleSearch(){
		let query = JSON.stringify(this.state.query)
		let that = this

		axios.get('/posts/search/' + query)
            .then(function(res){ 
            	that.setState({
					data: res.data
				})
        })

		// console.log("query made: " + query)
        // console.log('result:')
		// console.log(this.state.data)
		// console.log(Object.keys(this.state.data).length + ' result(s) returned')
	}

	updateQuery(newQuery){
		this.setState({
			query: newQuery,
			inputString: ""
		})
	}

	render() {
		return (
			<div>
				<SearchCriteria
					query={this.state.query}
					location={this.state.location}
					username={this.state.username}
					tags={this.state.tags} />
				<SearchBar
					inputString={this.state.inputString}
					onInputChange={this.handleInputChange}
					btnClick={this.handleSearch} />
				<SearchType
					query={this.state.query}
					updateQuery={this.updateQuery}
					inputString={this.state.inputString}/>
				<SearchResults
					data={this.state.data} />
			</div>
		)
	}

}