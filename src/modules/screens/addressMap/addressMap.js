import { LightningElement } from 'lwc';
import { Redux } from "redux/lwcRedux";

export default class AddressMap extends Redux(LightningElement) {

    mapStateToProps(state) {
        return {
            addressScreenValue: state.appReducer.address ? state.appReducer.address : {}
        }
    }


    isAssigned = false
    renderedCallback() {
        if (!this.isAssigned) {
            this.isAssigned = true;
            const lat = this.props.addressScreenValue?.address?.geometry?.location?.lat();
            const lng = this.props.addressScreenValue?.address?.geometry?.location?.lng();
            const map = new google.maps.Map(this.template.querySelector('.c-map'), {
                center: new google.maps.LatLng(lat, lng),
                zoom: 20,
                mapTypeControl: false,
                disableDefaultUI: true,
                mapTypeId: google.maps.MapTypeId.SATELLITE,
                tilt: 0
            });

            new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                map
            });
        }

    }

    handleNext(event) {
        event.detail.callback(true)
    }
    handleBack(event) {
        event.detail.callback(true)
    }

    get locationAddress() {
        if (this.props.addressScreenValue) {
            return this.props.addressScreenValue.address?.inputTextValue
        }
        return '';
    }
}