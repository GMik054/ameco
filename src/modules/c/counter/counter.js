import { LightningElement, api} from 'lwc';

export default class Counter extends LightningElement {
    @api value = 0;
    @api max;
    @api min;
    @api totalCount;
    @api recommendedCount;

    connectedCallback(){
        this.value = this.value ? this.value : 0
    }

    handleSubtractClick(){
        if(this.min !== undefined){
            if(this.value > parseInt(this.min, 10)){
                this.value -= 1;
            }
        }else{
            this.value -= 1;
        }
        this.dispatch()
    }

    handleAddClick(){
        if(this.recommendedCount != undefined && this.totalCount != undefined && this.totalCount >= this.recommendedCount){
            return;
        }
        if(this.max !== undefined){
            if(this.value < parseInt(this.max, 10)){
                this.value += 1;
            }
        }else{
            this.value += 1;
        }
        this.dispatch()
    }

    dispatch(){
        const changeEvent = new CustomEvent('change', {detail: {value: this.value}})
        this.dispatchEvent(changeEvent)
    }
}