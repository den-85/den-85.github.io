const commentTemplate = `
                    <div class="card mb-1" data-key="{{id}}">
                        <div class="row no-gutters">
                            <div class="col-md-1">
                                <img src="avatar.jpg" class="mt-3 ml-3" alt="user-avatar">
                            </div>
                            <div class="col">
                                <div class="card-body">
                                    <p class="alert-link">{{name}}</p>
                                    <p class="card-text">{{text}}</p>
                                    <p class="card-text"><small class="text-muted">Added on {{time}}</small></p>
                                </div>
                            </div>
                            <div class="col-md-1">
                                <button type="button" class="btn btn-link" id="rpl{{id}}">reply</button>
                                 <button type="button" class="btn btn-link" id="del{{id}}">delete</button>
                            </div>
                        </div>
                        <div data-child="{{id}}" class="ml-1 mr-1">
                        </div>
                       
                    </div>
`

class List extends Component {
  constructor(options) {
    super(options)

        this.$element.addEventListener('click', this._removeClickHandler.bind(this))
        this.$element.addEventListener('click', List._replyClickHandler.bind(this))
  }

  add(comments) {
    this._render(comments)
  }

  addSingle(comment) {
        this._renderSingle(comment)
    }

  _remove(id) {
        this._trigger('CommentRemoved', id)
        document.getElementById('comment-no').innerHTML = String(Number(document.getElementById('comment-no').innerHTML) - 1)
        const childToRemove = this.$element.querySelector(`[data-key="${id}"]`)
        childToRemove.parentNode.removeChild(childToRemove)
  }

  _removeClickHandler(event) {
      if (!event.target.id.includes('del')) {
          return;
      }

    const elementToDelete = this.$element.querySelector(`[data-key="${event.target.id.replace('del','')}"]`)
    this._remove(parseInt(elementToDelete.dataset.key))
  }

    static _replyClickHandler(event) {

        if (!event.target.id.includes('rpl')) {
            return;
        }
        document.getElementById('reply-to').value = event.target.id.replace('rpl','')
        document.getElementById('comment').focus()

    }

  _render(comments) {

      document.getElementById('comment-no').innerHTML = String(Object.keys(comments).length)
      this._prepareCommentSection(Object.keys(comments).length)
      for (let key in comments) {
          this._insertComment(comments[key]['parent'], Mustache.render(commentTemplate, comments[key]))
      }
  }

    _renderSingle(comment) {

        document.getElementById('comment-no').innerHTML = Number(document.getElementById('comment-no').innerHTML) + 1
        this._insertComment(comment['parent'], Mustache.render(commentTemplate, comment))
    }

  _prepareCommentSection(elements){

    if(elements){
        this.$element.innerHTML = ''
        this.$element.classList.remove('alert')
        this.$element.classList.remove('alert-danger')
    }else{
        this.$element.classList.add('alert')
        this.$element.classList.add('alert-danger')
    }

  }
  _insertComment(key, commentElement){

      let elem = this.$element.querySelector(`[data-child="${key}"]`)
      if(elem){
          elem.insertAdjacentHTML('beforeend', commentElement)
      }else{
          this.$element.insertAdjacentHTML('beforeend', commentElement)
      }


  }
}
