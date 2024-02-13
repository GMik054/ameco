
import { LightningElement } from 'lwc';
import { Redux } from "redux/lwcRedux";
import { setScreenValue, setSolution, getConfigurationData } from "actions/appActions";
import { validate, getNavigationOptions } from 'utility/helper';

export default class Address extends Redux(LightningElement) {

    selectSolar = false;
    selectRoofing = false;
    displayInterestError = false;

    cloneAddressData = {}
    connectedCallback() {
        super.connectedCallback();

        gtag('set', 'page_path', '/web-quote/address');
        gtag('event', 'page_view');

        this.props.getConfigurationData();

        if (this.props.selectedSolution === 'roof-solution') {
            this.selectRoofing = true;
        }
        else if (this.props.selectedSolution === 'solar-solution') {
            this.selectSolar = true;
        }
        else if (this.props.selectedSolution === 'solar-and-roof-solution' || this.props.selectedSolution === 'roof-solution:solar-solution' || this.props.selectedSolution === 'solar-solution:roof-solution') {
            this.selectRoofing = true;
            this.selectSolar = true;
        }

        const navigationOptions = getNavigationOptions(this.selectedSolution);
        this.props.setSolution(this.selectedSolution, navigationOptions)
        this.cloneAddressData = this.props.screenValue;


    }


    mapDispatchToProps() {
        return {
            setScreenValue: setScreenValue,
            setSolution: setSolution,
            getConfigurationData: getConfigurationData
        };
    }

    mapStateToProps(state) {
        return {
            screenValue: state.appReducer.address ? state.appReducer.address : {},
            selectedSolution: state.appReducer.selectedSolution
        }
    }

    handleAddressChange(event) {
        const value = event.detail.value;
        this.cloneAddressData = { ...this.cloneAddressData, address: value }
    }

    // handleEmailAddressChange(event){
    //     const value = event.detail.value;
    //     this.cloneAddressData = {...this.cloneAddressData, emailAddress: value}
    // }

    setScreenValue() {
        this.props.setScreenValue('address', this.cloneAddressData)
    }



    handleNextClick(event) {

        if (!this.selectSolar && !this.selectRoofing) {
            this.displayInterestError = true;
            event.detail.callback(false);
        }
        else {
            let isValidated = validate(this);
            if (isValidated) {
                const navigationOptions = getNavigationOptions(this.selectedSolution);
                this.props.setSolution(this.selectedSolution, navigationOptions)
                this.setScreenValue();
            }
            event.detail.callback(isValidated);
        }
    }

    handleBackClick(event) {
        this.setScreenValue();
        event.detail.callback(true);
    }

    handleSolarClick() {
        this.displayInterestError = false;
        this.selectSolar = !this.selectSolar;
    }

    handleRoofingClick() {
        this.displayInterestError = false;
        this.selectRoofing = !this.selectRoofing
    }

    get pageHeader() {
        if (this.props.selectedSolution === 'solar-solution') {
            return "Don't let all that good sunshine go to waste!";
        }
        return "Energy efficiency starts from the top, down"
    }

    get solarClass() {
        return this.selectSolar ? 'interest-button slds-align_absolute-center interest-header-selected' : 'interest-button slds-align_absolute-center';
    }

    get roofingClass() {
        return this.selectRoofing ? 'interest-button slds-align_absolute-center interest-header-selected' : 'interest-button slds-align_absolute-center';
    }

    get selectedSolution() {
        if (this.selectSolar && this.selectRoofing) {
            return 'solar-and-roof-solution'
        }
        else if (this.selectSolar) {
            return 'solar-solution'
        }
        else if (this.selectRoofing) {
            return 'roof-solution'
        }
        return ''
    }
}