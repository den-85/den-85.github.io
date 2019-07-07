class TipCalc {
    constructor(options){
        this.$el = options.element

        this.$bill = this.$el.querySelector('[data-component="bill"]')
        this.$percent = this.$el.querySelector('[data-component="percent"]')
        this.$split = this.$el.querySelector('[data-component="split"]')

        this.$split.addEventListener('change', this._splitChange.bind(this))
        this.$el.addEventListener('change', this._calculate.bind(this))
        this.$split.value = 1

        this._calculate()
    }

    _calculate(){
        this.$bill.value = Math.abs(this.$bill.value)
        this.$percent.value = Math.abs(this.$percent.value)

        let result = this.$bill.value * this.$percent.value * 0.01
        let total = parseFloat(this.$bill.value) + result

        res.setResultValue( result, this.$split.value )
        res.setTotalValue ( total, this.$split.value )

    }

    _splitChange(){
        document.getElementById('rangeValue').innerText = this.$split.value
        res.switchPerUserSection(this.$split.value)
    }

}







