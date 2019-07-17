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
      if(!event.detail){
          alert('Please enter some text to post')
          return
      }

    let currentDate = new Date()
    let datetime = currentDate.toDateString() + ' @ ' + currentDate.toTimeString()
    let replyTo = this.$element.querySelector('[data-selector="reply-to"]')
    let name = this.$element.querySelector('[data-selector="name"]')

    const comment = {
        name: name.value || 'Anonymous',
        text: event.detail,
        id: this._generateID(),
        time: datetime,
        parent: Number(replyTo.value || -1),
    }

    this._list.addSingle(comment)
    this._comments.push(comment)
    this._updateComments()
  }

  _onCommentRemoved({detail: id}) {

    //this._comments = this._comments.filter(comment => comment.id !== id)
    this._deleteHierarchy(id)
    this._updateComments()
  }

  _deleteHierarchy(id){

      this._comments = this._comments.filter(comment => comment.id !== id)
      for(let key in this._comments){
          if(this._comments[key]) {
              if (this._comments[key].parent === id) {
                  this._deleteHierarchy(this._comments[key].id)
              }
          }
      }
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
