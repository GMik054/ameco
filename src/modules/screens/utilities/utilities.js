
import { LightningElement} from 'lwc';
import { Redux } from "redux/lwcRedux";
import {setScreenValue} from "actions/appActions";
import {validate} from 'utility/helper';

export default class Utilities extends Redux(LightningElement) {

    mapDispatchToProps() {
		return {
            setScreenValue: setScreenValue
		};
	}

    mapStateToProps(state) {
        return {
            screenValue: state.appReducer.utilities ? state.appReducer.utilities : {},
            utilityProviders: state.appReducer.configuration?.utilityProviders?.length > 0 ? state.appReducer.configuration.utilityProviders : [],
        }   
    }

    handleMonthlyCostChange(event){
        const value = event.target.value;
        this.props.screenValue = {...this.props.screenValue, electricityMonthlyCost: value}
    }

    setScreenValue(){
        this.props.setScreenValue('utilities', this.props.screenValue)
    }

    handleNextClick(event){
        this.setScreenValue();
        event.detail.callback(validate(this));
    }

    handleBackClick(event){
        this.setScreenValue();
        event.detail.callback(true);
    }

    handleProviderChange(event){
        const id = event.target.value;
        let selectedUtilityProvider = this.props.utilityProviders.find(item => item.id === id)
        this.props.screenValue = {...this.props.screenValue, selectedUtilityProvider: selectedUtilityProvider}
    }

    get utilityProviderOptions(){
        if(this.props.utilityProviders?.length > 0){
            return this.props.utilityProviders.map((item) => {
                return {label: item.name, value: item.id}
            })
        }
        return []
    }

    get utilityProviderValue(){
        if(this.props.screenValue?.selectedUtilityProvider?.id){
            return this.props.screenValue?.selectedUtilityProvider?.id
        }
        return ''
    }
}