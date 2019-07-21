import React from 'react';
import ReactDOM from 'react-dom';

import {App} from "./App"
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
class Game extends React.Component {

    render() {

        return (

            <div className="container">
                <div className="row justify-content-md-center mt-3">
                    <div className="card col-lg-6 noPad">
                        <div className="card-header">GitHub User Statistics</div>
                        <div className="card-body">

                            <form data-selector="form">
                                <div className="form-group">
                                    <input type="text" className="form-control" id="user-name"
                                           placeholder="Please enter a GitHub username"
                                           data-component="user-name"/>
                                </div>
                                <button type="button" className="btn btn-success mt-3" id="getStats">Find user</button>
                            </form>

                        </div>
                    </div>
                </div>

                <div className="mt-3" id="results">

                </div>


            </div>






        )
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
const element = document.querySelector('[data-selector="form"]')
console.log(element)
element.querySelector("button").addEventListener("click", function () {
    const app = new App(element)
})