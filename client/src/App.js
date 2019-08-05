import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Posts from './display-posts.js'
import SearchResults from './search-results.js'


class App extends Component {
  render() {
    return (
      
        <Router>
          <div className="container">
            <Link to="/"> Home </Link>
            <Route path="/" exact component={Posts}/>
            <Route path="/search/:query" component={SearchResults}/>
          </div>
        </Router>
      
    );
  }
}

export default App;