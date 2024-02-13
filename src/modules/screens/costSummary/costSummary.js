
import { LightningElement } from 'lwc';
import { navigate } from 'nav/lwcRouterUtil';
import { Redux } from "redux/lwcRedux";
import { setSolution, setScreen, setScreenValue, saveCalulationData } from "actions/appActions";
import { getNavigationOptions } from 'utility/helper';

export default class CostSummary extends Redux(LightningElement) {
    displaySpinner = false;
    leadSource;

    connectedCallback() {
        super.connectedCallback();

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const source = urlParams.get('source')
        this.leadSource = source;
    }

    mapStateToProps(state) {
        return {
            selectedSolution: state.appReducer.selectedSolution,
            configuration: state.appReducer.configuration ? state.appReducer.configuration : {},
            address: state.appReducer.address ? state.appReducer.address : {},
            utilities: state.appReducer.utilities ? state.appReducer.utilities : {},
            solarPanels: state.appReducer.solarPanels ? state.appReducer.solarPanels : {},
            batteryStorage: state.appReducer.batteryStorage ? state.appReducer.batteryStorage : {},
            roofSelect: state.appReducer.roofSelect ? state.appReducer.roofSelect : {},
            materials: state.appReducer.materials ? state.appReducer.materials : {},
            insulation: state.appReducer.insulation ? state.appReducer.insulation : {},
            measurements: state.appReducer.measurements ? state.appReducer.measurements : {},
            submitEstimate: state.appReducer.submitEstimate ? state.appReducer.submitEstimate : {},
            screenValue: state.appReducer.costSummary ? state.appReducer.costSummary : {},
        }
    }

    mapDispatchToProps() {
        return {
            setSolution: setSolution,
            setScreen: setScreen,
            setScreenValue: setScreenValue,
            saveCalulationData: saveCalulationData
        };
    }

    setScreenValue() {
        this.props.screenValue = { ...this.props.screenValue, solarPanelCost: this.solarPanelCost }
        this.props.screenValue = { ...this.props.screenValue, totalSolarCost: this.totalSolarCost }
        this.props.screenValue = { ...this.props.screenValue, batteryStorageCost: this.batteryStorageCost }
        this.props.screenValue = { ...this.props.screenValue, federalTaxCredit: this.federalTaxCredit }
        this.props.screenValue = { ...this.props.screenValue, roofInstallationCost: this.roofInstallationCost }
        this.props.screenValue = { ...this.props.screenValue, insulationCost: this.insulationCost }
        this.props.screenValue = { ...this.props.screenValue, totalRoofCost: this.totalRoofCost }
        console.log(JSON.stringify(this.props.screenValue));
        this.props.setScreenValue('costSummary', this.props.screenValue)
    }
    error = false;

    handleNextClick(event) {

        if (!this.props.screenValue?.selectedPaymentMethod) {
            this.props.screenValue = { ...this.props.screenValue, estimatedMonthlyPayment: this.monthlyPaymentAmount }
            this.props.screenValue = { ...this.props.screenValue, loanAPR: this.rateOfInterest }
            this.props.screenValue = { ...this.props.screenValue, loanTerm: this.noOfYears }
            this.props.screenValue = { ...this.props.screenValue, lifetimeSavings: this.nYearSavingForLoan }
            this.props.screenValue = { ...this.props.screenValue, selectedPaymentMethod: 'Loan' }
        }


        this.setScreenValue();

        event.detail.callback(true);
        // if (this.props.screenValue?.selectedPaymentMethod) {
        //     this.displaySpinner = true;
        //     this.props.saveCalulationData(this.data, (result) => {
        //         if (result.isSuccess) {
        //             event.detail.callback(true);
        //         } else {
        //             console.log(result)
        //         }
        //         this.displaySpinner = false;
        //     });
        // }
    }

    handleBackClick(event) {
        this.setScreenValue();
        event.detail.callback(true);
    }

    handleSelectCash() {
        this.props.screenValue = { ...this.props.screenValue, lifetimeSavings: this.totalSaving }
        this.props.screenValue = { ...this.props.screenValue, selectedPaymentMethod: 'Cash' }
    }

    handleSelectLoan() {
        this.props.screenValue = { ...this.props.screenValue, estimatedMonthlyPayment: this.monthlyPaymentAmount }
        this.props.screenValue = { ...this.props.screenValue, loanAPR: this.rateOfInterest }
        this.props.screenValue = { ...this.props.screenValue, loanTerm: this.noOfYears }
        this.props.screenValue = { ...this.props.screenValue, lifetimeSavings: this.nYearSavingForLoan }
        this.props.screenValue = { ...this.props.screenValue, selectedPaymentMethod: 'Loan' }
    }

    handleAddSolar() {
        const navigationOptions = getNavigationOptions('roof-solution:solar-solution');
        this.props.setSolution('roof-solution:solar-solution', navigationOptions)
        this.props.screenValue = { ...this.props.screenValue, hasSolarEstimate: true }
        if (navigationOptions.length > 0) {
            this.props.setScreen(':url/utilities')
            navigate(this, ':url/utilities')
        }
    }

    handleAddRoof() {
        const navigationOptions = getNavigationOptions('solar-solution:roof-solution');
        this.props.setSolution('solar-solution:roof-solution', navigationOptions)
        if (navigationOptions.length > 0) {
            this.props.setScreen(':url/roof-select')
            navigate(this, ':url/roof-select')
        }
    }

    normalizeInteger(value) {
        return value ? parseInt(value, 10) : 0;
    }

    normalizeFloat(value) {
        return value ? parseFloat(value) : 0;
    }

    compoundInterest(amount, months, rate) {
        console.log(amount, months, rate);

        var principal = amount;
        var interest = rate / 100 / 12;
        var payments = months;

        // Now compute the monthly payment figure, using esoteric math.
        var x = Math.pow(1 + interest, payments);
        return ((principal * x * interest) / (x - 1)).toFixed(2);




    };

    get cashCardClass() {
        return this.props.screenValue?.selectedPaymentMethod === 'Cash' ? 'slds-card c-selected' : 'slds-card'
    }

    get loanCardClass() {
        return this.props.screenValue?.selectedPaymentMethod === 'Loan' ? 'slds-card c-selected' : 'slds-card'
    }

    get solarPanelCost() {
        if (this.systemRequirement && this.panelWorkingRatio && this.props.solarPanels?.selectedPanel?.pricePerUnit) {
            console.log('System Requirement: ', this.systemRequirement, 'Panel Cost Per Watt', this.props.solarPanels?.selectedPanel.pricePerUnit)
            return parseInt(
                ((this.systemRequirement * 1000) * this.normalizeFloat(this.panelWorkingRatio)) + (this.props.solarPanels?.selectedPanel.pricePerUnit * this.systemRequirement * 1000));

            //return parseInt(((this.systemRequirement * 1000) / (this.normalizeFloat(this.panelWorkingRatio) * 365)) * this.normalizeInteger(this.props.solarPanels?.selectedPanel.pricePerUnit), 10);
        }
        return 0;
    }

    get panelWorkingRatio() {
        if (this.props.configuration?.workingRatio?.length > 0) {
            const systemRequirement = this.systemRequirement;
            const panelRatio = this.props.configuration?.workingRatio.find(item => {
                return item.lowRange <= systemRequirement && item.highRange >= systemRequirement
            })
            return panelRatio.pricePerUnit ? panelRatio.pricePerUnit : 0
        }
        return 0
    }

    get batteryStorageCost() {
        if (this.props.batteryStorage?.selectedBatteries?.length > 0) {
            let totalCost = 0;
            for (let battery of this.props.batteryStorage?.selectedBatteries) {
                totalCost += this.normalizeInteger(battery.pricePerUnit) * this.normalizeInteger(battery.count);
            }
            return totalCost;
        }
        return 0;
    }

    get federalTaxCredit() {
        return this.normalizeInteger(((this.normalizeInteger(this.solarPanelCost) + this.normalizeInteger(this.batteryStorageCost)) * 30) / 100);
    }

    get totalSolarCost() {
        if (this.displaySolarCost) {
            return (this.normalizeInteger(this.solarPanelCost) + this.normalizeInteger(this.batteryStorageCost)) - this.normalizeInteger(this.federalTaxCredit)
        }
        return 0;
    }
    get totalSolarCostWithoutRebate() {
        if (this.displaySolarCost) {
            return (this.normalizeInteger(this.solarPanelCost) + this.normalizeInteger(this.batteryStorageCost))
        }
        return 0;
    }

    get displaySolarCost() {
        return this.props.selectedSolution !== 'roof-solution'
    }

    get displayRoofCost() {
        return this.props.selectedSolution !== 'solar-solution'
    }

    get roofInstallMaterial() {
        if (this.props.materials?.selectedMaterial?.displayName) {
            return this.props.materials?.selectedMaterial?.displayName;
        }
        return 'No Material'
    }

    get roofInstallationCost() {
        if (this.props.materials?.selectedMaterial?.pricePerSQFT && this.pitchAdjustedSquareFootage > 0) {
            return this.normalizeInteger(this.props.materials?.selectedMaterial?.pricePerSQFT) * this.normalizeInteger(this.pitchAdjustedSquareFootage);
        }
        return 0;
    }

    get selectedInsulation() {
        if (this.props.insulation?.selectedInsulation?.displayName) {
            return this.props.insulation?.selectedInsulation?.displayName;
        }
        return 'No Insulation'
    }

    get insulationCost() {
        // if (this.props.insulation?.selectedInsulation?.pricePerSQFT && this.normalizedSquareFootage) {
        //     return this.normalizeInteger(this.props.insulation?.selectedInsulation?.pricePerSQFT) * this.normalizeInteger(this.normalizedSquareFootage);
        // }
        return 0;
    }

    get totalRoofCost() {
        if (this.displayRoofCost) {
            return this.normalizeInteger(this.roofInstallationCost) + this.normalizeInteger(this.insulationCost)
        }
        return 0;
    }

    get totalCost() {
        return this.normalizeInteger(this.totalRoofCost) + this.normalizeInteger(this.totalSolarCost)
    }

    get totalUtilityCost() {
        let lifetimeCost = 0;
        if (this.props.utilities?.electricityMonthlyCost) {
            let lastAnnualCost = this.normalizeFloat(this.props.utilities?.electricityMonthlyCost) * 12;
            lifetimeCost = lastAnnualCost;
            for (let i = 0; i < this.noOfYears - 1; i++) {
                lastAnnualCost = lastAnnualCost * 1.04;
                lifetimeCost += lastAnnualCost;
            }
            return this.normalizeInteger(lifetimeCost);
            // return this.normalizeInteger(this.normalizeFloat(this.props.utilities?.electricityMonthlyCost) * this.noOfYears * 12);
        }
    }

    get totalSaving() {
        return this.normalizeInteger(this.totalUtilityCost) - this.normalizeInteger(this.totalCost)
    }

    get systemRequirement() {
        if (this.props.solarPanels?.systemRequirement) {
            return this.props.solarPanels?.systemRequirement;
        }
        return 0;
    }

    get noOfYears() {
        if (this.props.configuration?.loan?.numberOfYears) {
            return this.props.configuration?.loan?.numberOfYears;
        }
        return 0
    }

    get rateOfInterest() {
        if (this.props.configuration?.loan?.rate) {
            return this.props.configuration?.loan?.rate;
        }
        return 0
    }

    get monthlyPaymentAmount() {
        // let numPayments = noOfYears * 12;
        // let x = Math.pow(1 + (this.rateOfInterest / 100 / 12), numPayments);
        // return (this.totalCost * x * (this.rateOfInterest / 100 / 12)) / (x - 1);
        return this.compoundInterest(this.totalCost, this.noOfYears * 12, this.rateOfInterest); //this.normalizeInteger(this.totalCost / (rateValue - 1) / (this.rateOfInterest * rateValue));
    }

    get monthlyUtilityBill() {
        return this.normalizeFloat(this.props.utilities?.electricityMonthlyCost)
    }

    get nYearSavingForLoan() {
        return this.normalizeInteger(this.totalUtilityCost - (this.monthlyPaymentAmount * 12 * this.noOfYears));
    }

    get normalizedSquareFootage() {
        if (this.props.measurements?.squareFootage && this.props.measurements?.noOfStories) {
            return this.normalizeInteger(this.props.measurements?.squareFootage / this.props.measurements?.noOfStories)
        }
        return 0
    }

    get pitchFactor() {
        if (this.props.measurements?.selectedRoofPitch) {
            return this.props.measurements?.selectedRoofPitch.value;
        }
        return 0
    }

    get pitchAdjustedSquareFootage() {
        if (this.normalizedSquareFootage > 0 && this.pitchFactor > 0) {
            return (this.normalizedSquareFootage * this.pitchFactor) / 100
        }
        return 0
    }

    get data() {
        return {
            account: this.account,
            opportunity: this.opportunity,
            products: this.products
        }
    }

    get account() {
        return {
            firstName: this.props.submitEstimate.firstName,
            lastName: this.props.submitEstimate.lastName,
            phoneNumber: this.props.submitEstimate.phoneNumber,
            email: this.props.submitEstimate.emailAddress,
            address: this.address
        }
    }


    get opportunity() {
        return {
            avgMontholyBill: this.normalizeFloat(this.props.utilities?.electricityMonthlyCost),
            systemSize: this.systemRequirement * 1000,
            stories: this.normalizeInteger(this.props.measurements?.noOfStories),
            roofPitch: this.props.measurements?.selectedRoofPitch?.ratio,
            squareFootage: this.normalizeInteger(this.props.measurements?.squareFootage),
            isLoan: this.props.screenValue?.selectedPaymentMethod === 'Loan',
            solarPanelCost: this.props.screenValue?.solarPanelCost,
            totalSolarCost: this.props.screenValue?.totalSolarCost,
            batteryStorageCost: this.props.screenValue?.batteryStorageCost,
            federalTaxCredit: this.props.screenValue?.federalTaxCredit,
            roofInstallationCost: this.props.screenValue?.roofInstallationCost,
            insulationCost: this.props.screenValue?.insulationCost,
            totalRoofCost: this.props.screenValue?.totalRoofCost,
            loanAPR: this.props.screenValue?.loanAPR,
            loanTerm: this.props.screenValue?.loanTerm,
            estimatedMonthlyPayment: this.props.screenValue?.estimatedMonthlyPayment,
            lifetimeSavings: this.props.screenValue?.lifetimeSavings,
            leadSource: this.leadSource ? this.leadSource : 'Website Quote Calculator'
        }
    }

    get products() {
        let products = [];
        if (this.props.solarPanels?.selectedPanel?.id) {
            products = [...products, { id: this.props.solarPanels?.selectedPanel?.id, quantity: this.normalizeInteger(this.solarPanelsQuantity), cost: this.props.screenValue?.solarPanelCost }]
        }
        if (this.props.batteryStorage?.selectedBatteries?.length > 0) {
            products = [...products, ...this.props.batteryStorage.selectedBatteries.map(item => {
                return { id: item.id, quantity: item.count, cost: this.props.screenValue?.batteryStorageCost }
            })];
        }

        if (this.props.materials?.selectedMaterial?.id) {
            products = [...products, { id: this.props.materials?.selectedMaterial?.id, quantity: 1, cost: this.props.screenValue?.roofInstallationCost }]
        }

        if (this.props.insulation?.selectedInsulation?.id) {
            products = [...products, { id: this.props.insulation?.selectedInsulation?.id, quantity: 1, cost: this.props.screenValue?.insulationCost }]
        }

        // if (this.props.screenValue?.selectedPaymentMethod === 'Loan') {
        //     products = [...products, { id: this.props.configuration?.loan.id, quantity: 1 }];
        // }
        return products;
    }

    get solarPanelsQuantity() {
        return (this.systemRequirement * 1000) / 400;
    }

    get panelWorkingRatio() {
        if (this.props.configuration?.workingRatio?.length > 0) {
            const systemRequirement = this.systemRequirement;
            const panelRatio = this.props.configuration?.workingRatio.find(item => {
                return item.lowRange <= systemRequirement && item.highRange >= systemRequirement
            })
            return panelRatio.pricePerUnit ? panelRatio.pricePerUnit : 0
        }
        return 0
    }

    get systemRequirement() {
        if (this.props.solarPanels?.systemRequirement) {
            return this.props.solarPanels?.systemRequirement;
        }
        return 0;
    }

    get address() {
        let addressComponent = this.props.address.address?.address_components;
        let country;
        let postalCode;
        let state;
        let city;
        let street = [];

        for (let component of addressComponent) {

            let shortName = component.short_name;
            let longName = component.long_name;
            let type = component.types[0]
            console.log(type, longName, shortName)
            if (type === 'country') {
                country = shortName;
            }
            else if (type === 'postal_code') {
                postalCode = longName
            }
            else if (type === 'administrative_area_level_1') {
                state = longName;
            }
            else if (type === 'locality') {
                city = longName;
            }
            else if (type === 'street_number') {
                street.push(longName)
            } else if (type === 'route') {
                street.push(longName)
            }
        }

        return {
            country,
            postalCode,
            state,
            city,
            street: street.join(' '),
            lat: this.props.address.address?.geometry?.location.lat(),
            lng: this.props.address.address?.geometry?.location.lng()
        }

    }

}