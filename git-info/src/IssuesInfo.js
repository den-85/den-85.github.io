import React from "react";

export class IssuesInfo extends React.Component {
    constructor(props){
        super(props)
        this.props = props
    }

    render(){
        let repoUrl = this.props.issue.repository_url.split("/")
        let repo = repoUrl[repoUrl.length-1]
        return(
            <tr>
                <td><a target="_blank"  rel="noopener noreferrer" href={this.props.issue.html_url}>{repo}</a></td>
                <td>{this.props.issue.title}</td>
                <td>{this.props.issue.state}</td>
                <td>{this.props.issue.user.login}</td>
                <td>{this.props.issue.created_at}</td>
                <td>{this.props.issue.updated_at}</td>
            </tr>
        )
    }
}
