import { LightningElement } from 'lwc';
import { Redux } from "redux/lwcRedux";
import { setScreenValue } from "actions/appActions";

export default class batteryStorage extends Redux(LightningElement) {


    mapDispatchToProps() {
        return {
            setScreenValue: setScreenValue
        };
    }

    mapStateToProps(state) {
        return {
            batteries: state.appReducer.configuration?.batteries?.length > 0 ? state.appReducer.configuration.batteries : [],
            screenValue: state.appReducer.batteryStorage ? state.appReducer.batteryStorage : {},
            solarPanels: state.appReducer.solarPanels ? state.appReducer.solarPanels : {}
        }
    }

    setScreenValue() {
        if(this.props.screenValue?.selectedBatteries?.length === 0){
            this.props.screenValue = { ...this.props.screenValue, noBatteryNeeded: true, selectedBatteries: [] };
        }
        this.props.setScreenValue('batteryStorage', this.props.screenValue)
    }

    handleNextClick(event) {
        this.setScreenValue();
        event.detail.callback(true);
    }

    handleBackClick(event) {
        this.setScreenValue();
        event.detail.callback(true);
    }

    handleCountChange(event) {
        const count = event.detail.value;
        const batteryId = event.target.dataset.id;
        let selectedBatteries = this.props.screenValue.selectedBatteries;
        if (selectedBatteries && selectedBatteries.length > 0) {
            let found = false;
            for (let currentBattery of selectedBatteries) {
                if (currentBattery.id === batteryId) {
                    found = true
                    currentBattery.count = count;
                }
            }

            if (!found) {
                let selectedBattery = this.batteryStorageOption.find(item => item.id === batteryId)
                selectedBattery.count = count;
                selectedBatteries = [...selectedBatteries, selectedBattery];
            }
        } else {
            let selectedBattery = this.batteryStorageOption.find(item => item.id === batteryId)
            selectedBattery.count = count;
            selectedBatteries = [];
            selectedBatteries = [...selectedBatteries, selectedBattery];
        }

        this.props.screenValue = { ...this.props.screenValue, selectedBatteries: selectedBatteries, noBatteryNeeded: false }
    }

    handleNoBatteryClick() {
        this.props.screenValue = { ...this.props.screenValue, noBatteryNeeded: true, selectedBatteries: [] };
    }

    get batteryStorageOption() {
        let options = this.props.batteries.map(item => {
            return { ...item, className: 'slds-card', count: 0 }
        });

        if (this.props.screenValue.selectedBatteries && this.props.screenValue.selectedBatteries.length > 0) {
            let selectedBatteries = this.props.screenValue.selectedBatteries;
            for (let option of options) {
                let selectedBattery = selectedBatteries.find(item => item.id === option.id)
                if (selectedBattery && selectedBattery.count > 0) {
                    option.className = 'slds-card c-selected'
                    option.count = selectedBattery.count;
                } else {
                    option.className = 'slds-card'
                    option.count = 0;
                }
            }
        }

        return options;
    }

    get selectedCount() {
        let selectedCount = 0;
        if (this.props.screenValue.selectedBatteries && this.props.screenValue.selectedBatteries.length > 0) {
            for (let selectedBattery of this.props.screenValue.selectedBatteries) {
                if (selectedBattery.count) {
                    selectedCount += selectedBattery.count
                }
            }
        }

        return selectedCount;
    }

    get recommendedCount() {
        if (this.props.solarPanels?.systemRequirement) {
            return parseInt(this.props.solarPanels?.systemRequirement / 2.5)
        }
        return 0;
    }

    get noBatteryCard(){
        return this.props.screenValue.noBatteryNeeded ? 'slds-card no-battery-storage c-selected' : 'slds-card no-battery-storage'
    }
}