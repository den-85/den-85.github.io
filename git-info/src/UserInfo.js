import React from "react";

export class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
    }

    render(){
        return  (
                <div className="card col-lg-12 noPad">
                    <div className="card-header">{this.props.user.login}</div>
                    <div className="card-body">
                        <table className="table table-borderless">
                            <tbody>
                            <td >
                                <img className="avatar" src={this.props.user.avatar_url} alt={this.props.user.login}/>
                            </td>
                            <td>
                                some user details will appear here someday
                            </td>
                            </tbody>
                        </table>
                    </div>
                </div>
        )
    }
}
