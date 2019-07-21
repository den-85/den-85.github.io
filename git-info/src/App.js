import ReactDOM from "react-dom"

import {GetUserData} from "./GetUserData";
import {UserStats} from "./RenderUser"

export class App {
    constructor(element) {
        this.$el = element

        this.$userName = this.$el.querySelector('[data-component="user-name"]').value
        this.$stats = new GetUserData(this.$userName)
        this.$stats.getInfo()
            .then(() => {
                const userStats = new UserStats({user: this.$stats.user, repos: this.$stats.repos})
                ReactDOM.render(userStats.render(), document.getElementById("results"))
            })
    }
}
