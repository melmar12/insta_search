import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Row from "react-bootstrap/Row"
import Home from './pages/home/Home.js'
import Posts from './pages/posts/Posts.js'
import SearchResults from './pages/posts/SearchResults.js'
import Container from "react-bootstrap/Container"

class App extends Component {
  render() {
    return (
      <Container>
        <Router>
          <div className="navBar container">
            <Link to="/"> Posts </Link>
            <Link to="/home"> Home </Link>
          </div>
            <Row className="appBody container justify-content-md-center">
                <Route path="/home" component={Home}/>
                <Route path="/" exact component={Posts}/>
                <Route path="/search/:query" component={SearchResults}/>
            </Row>
          </Router>
        </Container>

    );
  }
}

export default App;