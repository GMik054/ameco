
import { LightningElement} from 'lwc';
import { Redux } from "redux/lwcRedux";
import {setScreenValue} from "actions/appActions";
import {validate} from 'utility/helper';

export default class Materials extends Redux(LightningElement) {

    mapDispatchToProps() {
		return {
            setScreenValue: setScreenValue
		};
	}

    mapStateToProps(state) {
        return {
            screenValue: state.appReducer.materials ? state.appReducer.materials : {},
            roofSelect: state.appReducer.roofSelect ? state.appReducer.roofSelect : {},
            roofMaterial: state.appReducer.configuration?.roofMaterial?.length > 0 ? state.appReducer.configuration.roofMaterial : [],
        }   
    }

    setScreenValue(){
        this.props.setScreenValue('materials', this.props.screenValue)
    }

    handleNextClick(event){
        this.setScreenValue();
        event.detail.callback(this.props.screenValue?.selectedMaterial?.id);
    }

    handleBackClick(event){
        this.setScreenValue();
        event.detail.callback(true);
    }

    handleMaterialClick(event){
        const selectedMaterial = this.roofMaterialOption.find(item => item.id === event.target.dataset.id)
        this.props.screenValue = {...this.props.screenValue, selectedMaterial: selectedMaterial}
    }

    get roofMaterialOption(){
        return this.props.roofMaterial.map(item => {
            return {...item, className: this.props.screenValue?.selectedMaterial?.id === item.id ? 'slds-card c-selected' : 'slds-card'}
        })
    }
}