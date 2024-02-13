
import { LightningElement } from 'lwc';
import { Redux } from "redux/lwcRedux";
import { setScreenValue } from "actions/appActions";

export default class SolarPanels extends Redux(LightningElement) {

    selectedPanel;

    mapDispatchToProps() {
        return {
            setScreenValue: setScreenValue
        };
    }

    mapStateToProps(state) {
        return {
            solarPanels: state.appReducer.configuration?.solarPanels?.length > 0 ? state.appReducer.configuration.solarPanels : [],
            loan: state.appReducer.configuration?.loan ? state.appReducer.configuration.loan : undefined,
            screenValue: state.appReducer.solarPanels ? state.appReducer.solarPanels : {},
            utilities: state.appReducer.utilities ? state.appReducer.utilities : {}
        }
    }

    setScreenValue() {
        this.props.setScreenValue('solarPanels', this.props.screenValue)
    }

    handleNextClick(event) {
        this.setScreenValue();
        event.detail.callback(this.props.screenValue?.selectedPanel?.id);
    }

    handleBackClick(event) {
        this.setScreenValue();
        event.detail.callback(true);
    }

    handlePanelClick(event) {
        const selectedPanel = this.panelOption.find(item => item.id === event.target.dataset.id)
        this.props.screenValue = { ...this.props.screenValue, selectedPanel: selectedPanel, systemRequirement: this.systemRequirement }
    }

    round(value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.ceil(value * multiplier) / multiplier;
    }

    get panelOption() {
        return this.props.solarPanels.map(item => {
            return { ...item, className: this.props.screenValue?.selectedPanel?.id === item.id ? 'slds-card product-card c-selected' : 'slds-card product-card' }
        })
    }

    get systemRequirement() {
        if (this.props.loan && this.props.utilities?.selectedUtilityProvider?.pricePerUnit && this.props.utilities?.electricityMonthlyCost) {
            let systemSize = (((parseFloat(this.props.utilities.electricityMonthlyCost) / this.props.utilities?.selectedUtilityProvider?.pricePerUnit) * 12) / 365 / 4).toFixed(2);
            systemSize = this.round(systemSize, 1);
            if((systemSize * 10) % 2 === 1){
                systemSize = systemSize + 0.1;
            }
            return systemSize.toFixed(1);
        }
        return 0;
    }
}

