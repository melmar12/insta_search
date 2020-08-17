import React, {Component} from 'react'
import Alert from "react-bootstrap/Alert"
import Icon from "./icons/info.svg"

export default class Hint extends Component {

    render() {
        return (
           <Alert className="hint" variant="secondary">
           <img className="mini-icon" src={Icon}/>
            search with combinations of username, location and hashtags 
          </Alert>
        )
    }
}