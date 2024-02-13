import { LightningElement, api } from 'lwc';

export default class ScreenLayout extends LightningElement {

    @api column = '6,6';
    @api background = 'c-background_white'

    handleNext(event) {
        const nextEvent = new CustomEvent('next', { detail: event.detail })
        this.dispatchEvent(nextEvent)
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
    handleBack(event) {
        const backEvent = new CustomEvent('back', { detail: event.detail })
        this.dispatchEvent(backEvent)
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }

    get firstClass() {
        return `slds-col slds-size_1-of-1 slds-medium-size_${this.columnNumbers[0]}-of-12 slds-large-size_${this.columnNumbers[0]}-of-12`
    }

    get secondClass() {
        return `slds-col slds-size_1-of-1 slds-medium-size_${this.columnNumbers[1]}-of-12 slds-large-size_${this.columnNumbers[1]}-of-12`
    }

    get columnNumbers() {
        return this.column.split(',')
    }

    get hideRight() {
        return this.columnNumbers.length < 2;
    }

    get backgroundClass() {
        return `c-container ${this.background}`
    }
}