import React, {Component} from 'react'

export default class SearchType extends Component {
    constructor(props) {
        super(props)
        this.isLocation = this.isLocation.bind(this)
        this.isUsername = this.isUsername.bind(this)
        this.isHashtag = this.isHashtag.bind(this)
        this.handleTypeSelection = this.handleTypeSelection.bind(this)
    }

    handleTypeSelection(type) {
        let value = this.props.inputString
        let newQuery = this.props.query
        switch(type) {
            case "username":
                newQuery.username = value
                break;
            case "location":
                newQuery.location = value
                break;
            case "tag":
                if(value[0] === '#'){
                    value = value.replace('#','')
                }
                newQuery.hashtags.push(value)
                break;
            default:
                console.log("default triggered...")
        }
        this.props.updateQuery(newQuery)
    }
    isLocation(e){
        e.target.checked = false;
        this.handleTypeSelection("location")
    }
    isUsername(e){
        e.target.checked = false;
        this.handleTypeSelection("username")
    }
    isHashtag(e){
        e.target.checked = false;
        this.handleTypeSelection("tag")
    }
    render() {
        return (
            <div>
                <div>
                    <label>choose one:</label>
                    <label>
                        <input type="checkbox" onClick={this.isLocation}/>
                        <span>location: {this.props.inputString}</span>
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" onClick={this.isUsername}/>
                        <span>username: {this.props.inputString}</span>
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" onClick={this.isHashtag}/>
                        <span>hashtag: {this.props.inputString}</span>
                    </label>
                </div>
            </div>
        )
    }
}