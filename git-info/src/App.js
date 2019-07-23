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

                const userStats = new UserStats({user: this.$stats.user, repos: this.$stats.repos, issues: this.$stats.issues})
                ReactDOM.render(userStats.render(), document.getElementById("results"))
            })
            .then(() => {

                const $reposTab = document.querySelector('[data-selector="ReposTab"]')
                const $issuesTab = document.querySelector('[data-selector="IssuesTab"]')
                const $reposData = document.querySelector('[data-selector="ReposData"]')
                const $issuesData = document.querySelector('[data-selector="IssuesData"]')

                $reposTab.addEventListener("click", function () {

                    $reposTab.classList.add("bg-success")
                    $issuesTab.classList.remove("bg-success")

                    $reposData.classList.remove("hidden")
                    $issuesData.classList.add("hidden")
                });

                $issuesTab.addEventListener("click", function () {

                    $issuesTab.classList.add("bg-success")
                    $reposTab.classList.remove("bg-success")

                    $reposData.classList.add("hidden")
                    $issuesData.classList.remove("hidden")
                });
            })

    }
}
