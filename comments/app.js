const apiUrl = 'https://api.myjson.com/bins/cjgc9'

class App {
  constructor({element}) {
    this.$element = element

    this._comments = []

    this._form = new Form({
      element: this.$element.querySelector('[data-component="form"]')
    })

    this._list = new List({
      element: this.$element.querySelector('[data-component="comment-list"]')
    })


    this._form.on('CommentSubmitted', this._onCommentSubmit.bind(this))
    this._list.on('CommentRemoved', this._onCommentRemoved.bind(this))

    this._init()
  }

  _init() {
    this._fetchComments()
  }

  _onCommentSubmit(event) {

      var currentDate = new Date();
      var datetime = "" + currentDate.getDay() + "/"+currentDate.getMonth()
          + "/" + currentDate.getFullYear() + " @ "
          + currentDate.getHours() + ":"
          + currentDate.getMinutes() + ":" + currentDate.getSeconds();
      let replyTo = this.$element.querySelector('[data-selector="reply-to"]')

    const comment = {
      text: event.detail,
      id: this._generateID(),
      time: datetime,
      parent:replyTo.innerHTML,
    }

    this._comments.unshift(comment)
    this._list.add(comment)

    this._updateComments()
      this._fetchComments()
  }

  _onCommentRemoved({detail: id}) {
    this._comments = this._comments.filter(comment => comment.id !== id)

    this._updateComments()
  }

  _generateID() {
    const ids = this._comments.map(comment => comment.id)

    return ids.length ? Math.max(...ids) + 1 : 0
  }

    _fetchComments() {
    Repository.fetch(apiUrl)
      .then(data => {
        this._comments = data.comments

        this._list.add(data.comments)
      })
  }

    _updateComments() {

    Repository.update(apiUrl, {
      'comments': this._comments

    })
      .then(() => console.log('saved successfully'))
      .catch((err) => console.error(err))
  }
}
