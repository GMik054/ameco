import { LightningElement } from 'lwc';
import {navigate} from 'nav/lwcRouterUtil';
import { Redux } from "redux/lwcRedux";
import {setSolution, getConfigurationData} from "actions/appActions";
import {getNavigationOptions} from 'utility/helper';

export default class SolutionPicker extends Redux(LightningElement) {

    connectedCallback(){
        super.connectedCallback();
        this.props.getConfigurationData();
    }

    mapDispatchToProps() {
		return {
            setSolution: setSolution,
            getConfigurationData: getConfigurationData
		};
	}

    handleSolarSolutionsClick(){
        //navigate(this, ':url/solar-solution')
        const navigationOptions = getNavigationOptions('solar-solution');
        this.props.setSolution('solar-solution', navigationOptions)
        if(navigationOptions.length > 0){
            navigate(this, navigationOptions[0].link)
        }
    }

    handleRoofSolutionsClick(){
        const navigationOptions = getNavigationOptions('roof-solution');
        this.props.setSolution('roof-solution', navigationOptions)
        if(navigationOptions.length > 0){
            navigate(this, navigationOptions[0].link)
        }
    }

    handleSolarAndRoofSolutionsClick(){
        const navigationOptions = getNavigationOptions('solar-and-roof-solution');
        this.props.setSolution('solar-and-roof-solution', navigationOptions)
        if(navigationOptions.length > 0){
            navigate(this, navigationOptions[0].link)
        }
    }
}