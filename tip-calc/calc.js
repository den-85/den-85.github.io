function TipCalc(options) {
    this.$el = options.element;

    this.$bill = this.$el.querySelector('[data-component="bill"]')
    this.$percent = this.$el.querySelector('[data-component="percent"]')
    this.$split = this.$el.querySelector('[data-component="split"]')

    this.$split.addEventListener('change', this._splitChange.bind(this))
    this.$el.addEventListener('change', this._calculate.bind(this))
    document.getElementById('eachSection').style.display = 'none;'
    this._calculate()
}

TipCalc.prototype._calculate = function(){

    let $result = document.querySelector('[data-component="result"]')
    let $total = document.querySelector('[data-component="total"]')

    let $resultPerson = document.querySelector('[data-component="resultPerson"]')
    let $totalPerson = document.querySelector('[data-component="totalPerson"]')


    $result.value = ( this.$bill.value * this.$percent.value * 0.01  ).toFixed(2)
    $total.value = ( parseFloat(this.$bill.value) + parseFloat($result.value) ).toFixed(2)

    if ( Number(this.$split.value) > 1 ) {
        $resultPerson.value = ( parseFloat($result.value) / parseFloat(this.$split.value) ).toFixed(2)
        $totalPerson.value = ( (parseFloat(this.$bill.value) + parseFloat($result.value) ) / parseFloat(this.$split.value) ).toFixed(2)
    }
}

TipCalc.prototype._splitChange = function(){
    document.getElementById('rangeValue').innerText = this.$split.value

    if(this.$split.value > 1) {
        document.getElementById('eachSection').style.display = 'block'
    }else{
        document.getElementById('eachSection').style.display = 'none'
    }
}

const app = new TipCalc({
  element: document.querySelector('[data-component="tip-calc"]')
})

