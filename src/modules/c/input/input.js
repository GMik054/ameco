import { LightningElement, api} from 'lwc';

export default class Input extends LightningElement {
    @api label;
    @api type;
    @api placeholder;
    @api required
    @api errorMessage = 'This is required field.';

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

    handleKeyup(event){
        this.error = {}
        this._value = event.target.value;
    }

    handleBlur(){
        this.reportValidity();
    }

    validateEmailFormat(value){
        var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(value.match(validRegex)){
            return true;
        }
        return false;
    }

    @api checkValidity() {
		return !this.required || (this.value);
	}

    @api checkFormat() {
		if(this.value && this.type === 'email'){
            return this.validateEmailFormat(this.value)
        }
        return true;
	}

	@api reportValidity() {
		const isValid = this.checkValidity();
        const validFormat = this.checkFormat();
		this.error = isValid && validFormat ? {} : { message: !validFormat ? 'Invalid Email Format' : this.errorMessage };
		return isValid && validFormat;
	}

    get hasError() {
		return this.error ? this.error.message : "";
	}

    get containerClass(){
        return this.hasError ? 'slds-form-element slds-has-error' : 'slds-form-element'
    }

    get inputValue(){
        return this.value ? this.value : ''
    }
}