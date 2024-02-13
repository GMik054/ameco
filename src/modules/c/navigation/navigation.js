import { LightningElement} from 'lwc';
import { Redux } from "redux/lwcRedux";

export default class Navigation extends Redux(LightningElement) {

    mapStateToProps(state) {
        return {
            navigationOptions: state.appReducer.navigationOptions,
            selectedScreen: state.appReducer.selectedScreen
        }
    }

    get navigationOptions(){
        return this.props.navigationOptions.filter(item => item.visible).map(item => {
            return {
                ...item,
                isSelected: item.link === this.props.selectedScreen,
                itemClass: item.tab === this.selectedNavigationOption.tab ? 'slds-context-bar__item slds-is-active' : 'slds-context-bar__item c-inactive' 
            }
        })
    }

    get isVisible(){
        const selectedOption = this.props.navigationOptions.find(item => item.link === this.props.selectedScreen)
        return !selectedOption.hideHeader;
    }

    get selectedNavigationOption(){
        return this.props.navigationOptions.find(item => item.link === this.props.selectedScreen)
    }
}