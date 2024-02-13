
import { LightningElement} from 'lwc';
import { Redux } from "redux/lwcRedux";
import {setScreenValue} from "actions/appActions";
import {validate} from 'utility/helper';

export default class Insulation extends Redux(LightningElement) {

    mapDispatchToProps() {
		return {
            setScreenValue: setScreenValue
		};
	}

    mapStateToProps(state) {
        return {
            screenValue: state.appReducer.insulation ? state.appReducer.insulation : {},
            insulation: state.appReducer.configuration?.insulation?.length > 0 ? state.appReducer.configuration.insulation : [],
        }   
    }

    setScreenValue(){
        this.props.setScreenValue('insulation', this.props.screenValue)
    }

    handleNextClick(event){
        this.setScreenValue();
        event.detail.callback(this.props.screenValue?.selectedInsulation?.id || this.props.screenValue?.noInsulationNeeded);
    }

    handleBackClick(event){
        this.setScreenValue();
        event.detail.callback(true);
    }

    handleInsulationClick(event){
        const selectedInsulation = this.insulationOptions.find(item => item.id === event.target.dataset.id)
        this.props.screenValue = {...this.props.screenValue, selectedInsulation: selectedInsulation, noInsulationNeeded: false}
    }

    handleNoInsulationClick(){
        this.props.screenValue = {...this.props.screenValue, noInsulationNeeded: true, selectedInsulation: {}};
    }

    get insulationOptions(){
        return this.props.insulation.map(item => {
            return {...item, className: this.props.screenValue?.selectedInsulation?.id === item.id ? 'slds-card c-selected' : 'slds-card'}
        })
    }

    get noInsulationCard(){
        return this.props.screenValue.noInsulationNeeded ? 'slds-card no-insulation c-selected' : 'slds-card no-insulation' 
    }
}