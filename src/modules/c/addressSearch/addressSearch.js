import { LightningElement, api} from 'lwc';

export default class AddressSearch extends LightningElement {
    @api label;
    @api type;
    @api placeholder;
    @api required
    @api errorMessage = 'This is required field.';
    @api value = {};

    isAssigned = false
    autocomplete;
    place;
    error

    renderedCallback(){
        if(!this.isAssigned){
            this.isAssigned = true;
            if(this.inputValue){
                this.template.querySelector('.search-address').value = this.inputValue;
                this.place = this.value;
            }
            this.autocomplete = new google.maps.places.Autocomplete(this.template.querySelector('.search-address'), {
                types: ['address'],
                field: ['place_id', 'geometry', 'name'],
                componentRestrictions: { country: "us" }
            })

            this.autocomplete.addListener("place_changed", this.handlePlaceChange.bind(this));
        }
    }

    handlePlaceChange(){
        this.error = {}
        this.place = this.autocomplete.getPlace();
        this.place.inputTextValue = this.template.querySelector('.search-address').value
        const changeEvent = new CustomEvent('change', {detail: {value: this.place}})
        this.dispatchEvent(changeEvent);
    }

    handleKeyup(){
        this.error = {}
        if(!this.template.querySelector('.search-address').value){
            this.place = {}
            const changeEvent = new CustomEvent('change', {detail: {value: this.place}})
            this.dispatchEvent(changeEvent);
        }
    }

    handleBlur(){
        setTimeout(() => {
            this.reportValidity();
        }, 500)
        
    }

    @api checkValidity() {
		return !this.required || (this.place?.name);
	}

	@api reportValidity() {
		const isValid = this.checkValidity();
		this.error = isValid ? {} : { message: this.errorMessage };
		return isValid;
	}

    get hasError() {
		return this.error ? this.error.message : "";
	}

    get containerClass(){
        return this.hasError ? 'slds-form-element slds-has-error' : 'slds-form-element'
    }

    get inputValue(){
        if(this.value && this.value.inputTextValue){
            return this.value.inputTextValue;
        }
        return ''
    }

    
}