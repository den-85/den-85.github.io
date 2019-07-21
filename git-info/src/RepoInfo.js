import React from "react";

export class RepoInfo extends React.Component {
    constructor(props){
        super(props)
        this.props = props
    }

    render(){
        return(
            <tr>
                <td>{this.props.repo.name}</td>
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
