class Form extends Component{
  constructor(options) {
    super(options)

    this.$element.addEventListener('submit', this._submitHandler.bind(this))
  }

  _submitHandler(event) {
    event.preventDefault()


    this._trigger('CommentSubmitted', this.$element.comment.value)
    this.$element.reset()
  }
}
