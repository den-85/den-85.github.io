export class Component {
  constructor({element}) {
    this.$element = element
  }

  on(eventName, handler) {
    this.$element.addEventListener(eventName, handler)
  }

  _trigger(eventName, detail) {
    const event = new CustomEvent(eventName, {detail})
    this.$element.dispatchEvent(event)
  }
}
