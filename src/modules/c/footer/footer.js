import { LightningElement, api } from 'lwc';
import { Redux } from "redux/lwcRedux";
import { setScreen } from "actions/appActions";
import { navigate } from 'nav/lwcRouterUtil';

export default class Footer extends Redux(LightningElement) {

    @api absolute = false;
    mapStateToProps(state) {
        return {
            navigationOptions: state.appReducer.navigationOptions,
            selectedScreen: state.appReducer.selectedScreen
        }
    }
    mapDispatchToProps() {
        return {
            setScreen: setScreen
        };
    }

    handleBack() {
        const backEvent = new CustomEvent('back', {
            detail: {
                callback: (success) => {
                    if (success) {
                        const index = this.props.navigationOptions.findIndex(item => item.link === this.props.selectedScreen)
                        if (index - 1 >= 0) {
                            this.props.setScreen(this.props.navigationOptions[index - 1].link)
                            navigate(this, this.props.navigationOptions[index - 1].link)
                            gtag('set', 'page_path', '/web-quote/' + this.props.navigationOptions[index - 1].tab);
                            gtag('event', 'page_view');
                        }
                    }

                }
            }
        })
        this.dispatchEvent(backEvent);
    }

    handleNext() {
        const nextEvent = new CustomEvent('next', {
            detail: {
                callback: (success) => {
                    if (success) {
                        const index = this.props.navigationOptions.findIndex(item => item.link === this.props.selectedScreen)
                        if (index + 1 <= this.props.navigationOptions.length - 1) {
                            this.props.setScreen(this.props.navigationOptions[index + 1].link)
                            navigate(this, this.props.navigationOptions[index + 1].link)
                            gtag('set', 'page_path', '/web-quote/' + this.props.navigationOptions[index + 1].tab);
                            gtag('event', 'page_view');
                        }
                    }

                }
            }
        })

        this.dispatchEvent(nextEvent);
    }

    get hasBack() {
        const index = this.props.navigationOptions.findIndex(item => item.link === this.props.selectedScreen)

        if (index === 0) {
            return false;
        }
        return true;
    }

    get hasSubmit() {
        const index = this.props.navigationOptions.findIndex(item => item.link === this.props.selectedScreen)

        return this.props.navigationOptions[index].displaySubmit;
    }

    get hasNext() {
        const index = this.props.navigationOptions.findIndex(item => item.link === this.props.selectedScreen)

        if (index === this.props.navigationOptions.length - 1 || this.props.navigationOptions[index].displaySubmit) {
            return false;
        }
        return true;
    }

    get selectedNavigationOption() {
        return this.props.navigationOptions.find(item => item.link === this.props.selectedScreen)
    }
    get absoluteStyle() {
        return this.absolute ? `position: absolute; bottom: 2rem;` : "";
    }
}