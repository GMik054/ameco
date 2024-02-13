import { LightningElement, api} from 'lwc';

export default class Slider extends LightningElement {
    @api label;
    @api max = 10000;
    @api min = 0
    @api required
    @api errorMessage = 'This is required field.';
    @api fieldLevelHelp;
    @api valueLabel;

    _value
    @api 
    get value(){
        return this._value
    }

    set value(data = ''){
        this._value = data
    }

    error;


    handleChange(event){
        this._value = event.target.value;
        const changeEvent = new CustomEvent('change', {detail: {value: this.value}})
        this.dispatchEvent(changeEvent);
    }


    @api checkValidity() {
		return !this.required || (this.value);
	}

	@api reportValidity() {
		const isValid = this.checkValidity();
		this.error = isValid  ? {} : { message: this.errorMessage };
		return isValid;
	}

    get hasError() {
		return this.error ? this.error.message : "";
	}

    get containerClass(){
        return this.hasError ? 'slds-form-element c-slider__range slds-has-error' : 'slds-form-element c-slider__range'
    }

    get inputValue(){
        return this.value ? this.value : ''
    }
}