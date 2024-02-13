import { LightningElement } from 'lwc';
import { Redux } from "redux/lwcRedux";
import { setScreenValue } from "actions/appActions";
import { validate } from 'utility/helper';

export default class Measurements extends Redux(LightningElement) {

    connectedCallback() {
        super.connectedCallback();
        this.props.screenValue = { ...this.props.screenValue, noOfStories: this.initialStories }
        this.props.screenValue = { ...this.props.screenValue, squareFootage: this.initialValue }
    }

    mapDispatchToProps() {
        return {
            setScreenValue: setScreenValue
        };
    }

    mapStateToProps(state) {
        return {
            screenValue: state.appReducer.measurements ? state.appReducer.measurements : {}
        }
    }

    setScreenValue() {
        this.props.setScreenValue('measurements', this.props.screenValue)
    }

    handleNextClick(event) {
        this.setScreenValue();
        event.detail.callback(validate(this) && this.props.screenValue?.selectedRoofPitch?.id);
    }

    handleBackClick(event) {
        this.setScreenValue();
        event.detail.callback(true);
    }

    handleMeasurementClick(event) {
        const selectedRoofPitch = this.roofPitchOptions.find(item => item.id === event.target.dataset.id)
        this.props.screenValue = { ...this.props.screenValue, selectedRoofPitch: selectedRoofPitch }
    }

    handleStoriesChange(event) {
        this.props.screenValue = { ...this.props.screenValue, noOfStories: event.target.value }
    }

    handleRangeChange(event) {
        this.props.screenValue = { ...this.props.screenValue, squareFootage: event.detail.value }
    }

    get roofPitchOptions() {
        return [
            {
                id: 'Flat',
                name: 'Flat',
                image: 'https://ameco-quote-calculator-bucket.s3.us-west-1.amazonaws.com/Resources/Icons/Flat.svg',
                ratio: '0/12',
                value: 1.1,
                className: this.props.screenValue?.selectedRoofPitch?.id === 'Flat' ? 'slds-card roof-card c-selected ' : 'slds-card roof-card',
                style: 'padding-top: 2rem; background: white;'
            },
            {
                id: 'Low',
                name: 'Low',
                image: 'https://ameco-quote-calculator-bucket.s3.us-west-1.amazonaws.com/Resources/Icons/Low.svg',
                ratio: '1-2/12',
                value: 1.1,
                className: this.props.screenValue?.selectedRoofPitch?.id === 'Low' ? 'slds-card roof-card c-selected' : 'slds-card roof-card',
                style: 'padding-top: 1.9rem; background: white;'
            },
            {
                id: 'Conventional',
                name: 'Conventional',
                image: 'https://ameco-quote-calculator-bucket.s3.us-west-1.amazonaws.com/Resources/Icons/Conventional.svg',
                ratio: '3-9/12',
                value: 1.75,
                className: this.props.screenValue?.selectedRoofPitch?.id === 'Conventional' ? 'slds-card roof-card c-selected' : 'slds-card roof-card',
                style: 'padding-top: 1.1rem; background: white;'
            },
            {
                id: 'Steep',
                name: 'Steep',
                image: 'https://ameco-quote-calculator-bucket.s3.us-west-1.amazonaws.com/Resources/Icons/Steep.svg',
                ratio: '9-12/12',
                value: 2,
                className: this.props.screenValue?.selectedRoofPitch?.id === 'Steep' ? 'slds-card roof-card c-selected' : 'slds-card roof-card',
                style: 'padding-top: 0.25rem; background: white;'
            }
        ]
    }

    get storiesOptions() {
        return [
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
        ];
    }

    get initialValue() {
        return this.props.screenValue?.squareFootage ? this.props.screenValue.squareFootage : 300
    }
    get initialStories() {
        return this.props.screenValue?.noOfStories ? this.props.screenValue.noOfStories : 1;
    }
}