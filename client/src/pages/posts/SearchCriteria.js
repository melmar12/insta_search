import React, {Component} from 'react'

export default class SearchCriteria extends Component {

    render() {
        return (
            <div>
                <label>search criteria</label>
                <ul>
                    <li>location: {this.props.query.location}</li>
                    <li>username: {this.props.query.username}</li>
                    <li>hashtags:
                        <ul>
                            {this.props.query.hashtags.map(function(item, i){
                                return <li key={i}>{item}</li>})
                           }
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}