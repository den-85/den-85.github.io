import {Component} from './component'

export class Form extends Component{
  constructor(options) {
    super(options)

    this.$element.addEventListener('submit', this._submitHandler.bind(this))
  }

  _submitHandler(event) {
    event.preventDefault()


    this._trigger('TodoSubmitted', this.$element.todo.value)
    this.$element.reset()
  }
}
