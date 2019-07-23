export class GetUserData {
    constructor(userName) {
        this.url = "https://api.github.com/users/" + userName
        this.urlRepos = "https://api.github.com/users/" + userName   + "/repos?sort=pushed&order=desc"
        this.urlIssues = "https://api.github.com/search/issues?q=user:" + userName + "&sort=updated&order=desc"
        this.user = {}
        this.repos = {}
        this.issues = {}
    }

    getInfo() {
        return this.getUserInfo()
            .then(() => {
                return this.getUserRepos()
            })
            .then(() => {
                return this.getUserIssues()
            })
            .then(() => {
                return {user: this.user, repos: this.repos, issues: this.issues}
            })
    }

    getUserInfo() {
        return fetch(this.url)
            .then((response) => response.json())
            .then((response) => {
                this.user = response;
            })
    }

    getUserRepos() {
        return fetch(this.urlRepos)
            .then((response) => response.json())
            .then((response) => {
                this.repos = response;
            })
    }
    getUserIssues() {
        return fetch(this.urlIssues)
            .then((response) => response.json())
            .then((response) => {
                this.issues = response.items;
            })
    }
}