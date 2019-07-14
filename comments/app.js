import {Form} from './form'
import {List} from './list'
import Config from './config'
import Repository from './repository'


export class App {
  constructor({element}) {
    this.$element = element

    this._comments = []

    this._form = new Form({
      element: this.$element.querySelector('[data-component="form"]')
    })

    this._list = new List({
      element: this.$element.querySelector('[data-component="comment-list"]')
    })


    this._form.on('TodoSubmitted', this._onCommentSubmit.bind(this))
    //this._list.on('TodoRemoved', this._onTodoRemoved.bind(this))

    this._init()
  }

  _init() {
    this._fetchComments()
  }

  _onCommentSubmit(event) {
    const comment = {
      text: event.detail,
      id: this._generateID(),
    }

    this._comments.unshift(comment)
    this._list.add(comment)

    this._updateComments()
  }

  /*_onTodoRemoved({detail: id}) {
    this._comments = this._comments.filter(comment => comment.id !== id)

    this._updateComments()
  }*/

  _generateID() {
    const ids = this._comments.map(comment => comment.id)

    return ids.length ? Math.max(...ids) + 1 : 0
  }

    _fetchComments() {
    Repository.fetch(Config.apiUrl)
      .then(data => {
        this._comments = data.comments

        this._list.add(data.comments)
      })
  }

    _updateComments() {
    Repository.update(Config.apiUrl, {
      'comments': this._comments
    })
      .then(() => console.log('saved successfully'))
      .catch((err) => console.error(err))
  }
}
