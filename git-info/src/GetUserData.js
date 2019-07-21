export class GetUserData {
    constructor(userName) {
        this.url = "https://api.github.com/users/" + userName
        this.user = {}
        this.repos = {}
    }

    getInfo() {
        return this.getUserInfo()
            .then(() => {
                return this.getUserRepos()
            })
            .then(() => {
                return {user: this.user, repos: this.repos}
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
        return fetch(this.url + "/repos")
            .then((response) => response.json())
            .then((response) => {
                this.repos = response;
            })
    }
}