function TipCalc(options) {
    this.$el = options.element;

    this.$bill = this.$el.querySelector('[data-component="bill"]')
    this.$percent = this.$el.querySelector('[data-component="percent"]')
    this.$split = this.$el.querySelector('[data-component="split"]')

    this.$split.addEventListener('change', this._splitChange.bind(this))
    this.$el.addEventListener('change', this._calculate.bind(this))
    document.getElementById('eachLabel').style.display = 'none;'
    this._calculate()
}

TipCalc.prototype._calculate = function(){
    let $result = document.querySelector('[data-component="result"]')
    $result.value = (this.$bill.value * this.$percent.value * 0.01 / this.$split.value || 1).toFixed(2);
}

TipCalc.prototype._splitChange = function(){
    document.getElementById('rangeValue').innerText = this.$split.value;

    if(this.$split.value > 1) {
        document.getElementById('eachLabel').style.display = 'block'
    }else{
        document.getElementById('eachLabel').style.display = 'none'
    }
}

const app = new TipCalc({
  element: document.querySelector('[data-component="tip-calc"]')
})

