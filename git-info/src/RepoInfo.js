import React from "react";

export class RepoInfo extends React.Component {
    constructor(props){
        super(props)
        this.props = props
    }

    render(){
        return(
            <tr>
                <td><a rel="noopener noreferrer" target="_blank"  href={this.props.repo.html_url}>{this.props.repo.name}</a></td>
                <td>{this.props.repo.language}</td>
                <td>{this.props.repo.created_at}</td>
                <td>{this.props.repo.pushed_at}</td>
                <td>{this.props.repo.forks_count}</td>
                <td>{this.props.repo.stargazers_count}</td>
                <td>{this.props.repo.size}</td>
            </tr>
        )
    }
}
