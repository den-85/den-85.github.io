import {UserInfo} from "./UserInfo";
import {RepoInfo} from "./RepoInfo";
import React from "react";
import avatarNotFound from './404pixar.jpg';

export class UserStats extends React.Component {
    constructor(props){
        super(props)
        this.props = props
        console.log(this.props)
    }

    render() {
        const userRepositories = Array.from(this.props.repos)
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
                            <span>Repositories</span>
                        </div>
                        <table className="table table-striped table-dark">
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
                            {userRepositories.map((repo) => <RepoInfo repo={repo}/>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
    }

}
