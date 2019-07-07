class TipResults {
    constructor(options) {
        this.$el = options.element
        this.$result = this.$el.querySelector('[data-component="result"]')
        this.$total = this.$el.querySelector('[data-component="total"]')
        this.$resultPerson = this.$el.querySelector('[data-component="resultPerson"]')
        this.$totalPerson = this.$el.querySelector('[data-component="totalPerson"]')
        this.$perUserSection = this.$el.querySelector('[data-component="perUserSection"]')
    }

    setResultValue(value, split = 1){

        this.$result.value = value.toFixed(2)

        if (split > 1){
            value /= split;
            this.$resultPerson.value = value.toFixed(2)
        }

    }

    setTotalValue(value, split = 1){

        this.$total.value = value.toFixed(2)

        if (split > 1){
            value /= split;
            this.$totalPerson.value = value.toFixed(2)
        }

    }

    switchPerUserSection(split){
        if(split > 1) {
            this.$perUserSection.style.display = 'block'
        }else{
            this.$perUserSection.style.display = 'none'
        }
    }
}


