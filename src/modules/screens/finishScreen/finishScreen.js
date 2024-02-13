import { LightningElement } from 'lwc';
import { Redux } from "redux/lwcRedux";

export default class FinishScreen extends Redux(LightningElement) {


    mapStateToProps(state) {
        return {
            selectedSolution: state.appReducer.selectedSolution
        }
    }

    get displaySolar() {
        return this.props.selectedSolution === 'solar-solution' || this.props.selectedSolution === 'solar-and-roof-solution'
    }

    get displayRoof() {
        return this.props.selectedSolution === 'roof-solution' || this.props.selectedSolution === 'solar-and-roof-solution'
    }

    connectedCallback() {
        gtag('set', 'page_path', '/web-quote/finish');
        gtag('event', 'page_view');
        super.connectedCallback();
    }

}