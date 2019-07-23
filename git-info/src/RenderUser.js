import {UserInfo} from "./UserInfo";
import {RepoInfo} from "./RepoInfo";
import {IssuesInfo} from "./IssuesInfo";
import React from "react";
import avatarNotFound from './404pixar.jpg';



export class UserStats extends React.Component {
    constructor(props){
        super(props)
        this.props = props
    }

    render() {
        const userRepositories = Array.from(this.props.repos)
        const userIssues = Array.from(this.props.issues)
        if(this.props.user.message  === 'Not Found'){
            return (

                <div className="card col-lg-12 noPad text-center">
                    <div className="card-header">{this.props.user.message}</div>
                    <div className="card-body">
                        <img className="avatar" src={avatarNotFound} alt="User not found"/>
                        <div>There is no such user on GitHub</div>
                    </div>
                </div>
            )
        }
        else {
            return (

                <div className="card col-lg-12 noPad">
                    <div className="card-body">

                        <UserInfo user={this.props.user}/>

                        <div className="mt-3">
                            <table className="table table-bordered table-tabs">
                                <tbody>
                                    <td data-selector="ReposTab" className="table-tabs bg-success">Repositories</td>
                                    <td data-selector="IssuesTab" className="table-tabs ">Issues</td>
                                </tbody>
                            </table>
                        </div>
                        <div data-selector="ReposData">
                            <table className="table table-striped ">
                                <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Language</th>
                                    <th scope="col">Created</th>
                                    <th scope="col">Pushed</th>
                                    <th scope="col">Forks</th>
                                    <th scope="col">Stars</th>
                                    <th scope="col">Size</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        userRepositories.map( (repo) => <RepoInfo repo={repo}/> )
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div data-selector="IssuesData" className="hidden">
                            <table className="table table-striped ">
                                <thead>
                                <tr>
                                    <th scope="col">Repo</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">State</th>
                                    <th scope="col">Created by</th>
                                    <th scope="col">Created at</th>
                                    <th scope="col">Latest update</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        userIssues.map( (issue) => <IssuesInfo issue={issue}/> )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
    }

}