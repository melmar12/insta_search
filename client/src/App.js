import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './pages/home/Home.js'
import Posts from './pages/posts/Posts.js'
import SearchResults from './pages/posts/SearchResults.js'

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="navBar container">
            <Link to="/"> Posts </Link>
            <Link to="/home"> Home </Link>
          </div>
          <Route path="/home" component={Home}/>
          <Route path="/" exact component={Posts}/>
          <Route path="/search/:query" component={SearchResults}/>
        </Router>
        </div>
      
    );
  }
}

export default App;