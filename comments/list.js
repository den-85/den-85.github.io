import {Component} from './component'
import Mustache from 'mustache'

const todoTemplate = `
                    <div class="card mb-3" data-key="{{id}}">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <img src="avatar.jpg" class="mt-3 ml-3" alt="user-avatar">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <p class="card-text">{{text}}</p>
                                    <p class="card-text"><small class="text-muted">Added on{{time}}</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
{{/comments}}
`

export class List extends Component {
  constructor(options) {
    super(options)

    this.$element.addEventListener('click', this._removeClickHandler.bind(this))
  }

  add(todos) {
    this._render(todos)
  }

  _remove(id) {
    this._trigger('TodoRemoved', id)

    const childToRemove = this.$element.querySelector(`[data-key="${id}"]`)
    this.$element.removeChild(childToRemove)
  }

  _removeClickHandler(event) {
    if (event.target.tagName !== 'BUTTON') {
      return;
    }


    const elementToDelete = event.target.closest('li')
    this._remove(parseInt(elementToDelete.dataset.key))
  }

  _render(todos) {
    const todoElement = Mustache.render(todoTemplate, {todos})

    this.$element.insertAdjacentHTML('afterbegin', todoElement)
  }
}
