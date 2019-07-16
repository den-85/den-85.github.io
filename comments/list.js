const commentTemplate = `
                    <div class="card mb-1" data-key="{{id}}">
                        <div class="row no-gutters">
                            <div class="col-md-1">
                                <img src="avatar.jpg" class="mt-3 ml-3" alt="user-avatar">
                            </div>
                            <div class="col">
                                <div class="card-body">
                                    <p class="card-text">{{text}}</p>
                                    <p class="card-text"><small class="text-muted">Added on {{time}}</small></p>
                                </div>
                            </div>
                            <div class="col-md-1">
                                 <button type="button" class="btn btn-link" id="btn{{id}}">&#x2715</button>
                            </div>
                        </div>
                        <div data-child="{{id}}" class="ml-2 mr-1">
                        </div>
                       
                    </div>
`

class List extends Component {
  constructor(options) {
    super(options)

    this.$element.addEventListener('click', this._removeClickHandler.bind(this))
  }

  add(comments) {
    this._render(comments)
  }

  _remove(id) {
    this._trigger('CommentRemoved', id)

    const childToRemove = this.$element.querySelector(`[data-key="${id}"]`)
    this.$element.removeChild(childToRemove)
  }

  _removeClickHandler(event) {
    if (event.target.tagName !== 'BUTTON') {
      return;
    }
    const elementToDelete = this.$element.querySelector(`[data-key="${event.target.id.replace('btn','')}"]`)
    this._remove(parseInt(elementToDelete.dataset.key))
  }

  _render(comments) {
      document.getElementById('comment-no').innerHTML = Object.keys(comments).length + ' Comments:'
      this._prepareCommentSection(Object.keys(comments).length)
      for (let key in comments) {
          console.log(comments[key])
          this._insertComment(comments[key]['parent'], Mustache.render(commentTemplate, comments[key]))
      }
  }
  _prepareCommentSection(elements){
    if(elements){
        this.$element.innerHTML = ''
        this.$element.classList.remove('alert')
        this.$element.classList.remove('alert-danger')
    }else{
        this.$element.innerHTML = 'no comments yet'
        this.$element.classList.add('alert')
        this.$element.classList.add('alert-danger')
    }

  }
  _insertComment(key, commentElement){

      let elem = this.$element.querySelector(`[data-child="${key}"]`)
      if(elem){
          elem.insertAdjacentHTML('beforeend', commentElement)
      }else{
          this.$element.insertAdjacentHTML('afterbegin', commentElement)
      }


  }
}
