import { LightningElement } from 'lwc';
import { Redux } from "redux/lwcRedux";
import { setScreenValue } from "actions/appActions";
import { validate } from 'utility/helper';

export default class RoofSelect extends Redux(LightningElement) {

    mapDispatchToProps() {
        return {
            setScreenValue: setScreenValue
        };
    }

    mapStateToProps(state) {
        return {
            screenValue: state.appReducer.materials ? state.appReducer.materials : {},
            roofMaterial: state.appReducer.configuration?.roofMaterial?.length > 0 ? state.appReducer.configuration.roofMaterial : [],
        }
    }

    setScreenValue() {
        this.props.setScreenValue('materials', this.props.screenValue)
    }

    handleNextClick(event) {
        this.setScreenValue();
        event.detail.callback(this.props.screenValue?.selectedMaterial?.id);
    }

    handleBackClick(event) {
        this.setScreenValue();
        event.detail.callback(true);
    }

    handleRoofClick(event) {
        const selectedId = event.target.dataset.id;
        let selectedRoof = this.roofOption.find(item => item.id === selectedId);

        this.props.screenValue = { ...this.props.screenValue, selectedRoof: selectedRoof }
    }

    handleMaterialClick(event) {
        const selectedMaterial = this.roofMaterialOption.find(item => item.id === event.target.dataset.id)
        this.props.screenValue = { ...this.props.screenValue, selectedMaterial: selectedMaterial }
    }

    get roofMaterialOption() {
        return this.props.roofMaterial.map(item => {
            return { ...item, className: this.props.screenValue?.selectedMaterial?.id === item.id ? 'c-solution c-roof c-m-around_x-large c-selected' : 'c-solution c-roof c-m-around_x-large' }
        })
    }

    get roofOption() {
        return [
            {
                id: 'Shingle Roof',
                name: 'Shingle Roof',
                image: '/Resources/Illustration/Roofing_4A.svg',
                className: this.props.screenValue?.selectedRoof?.id === 'Shingle Roof' ? 'c-solution c-roof c-m-around_x-large c-selected' : 'c-solution c-roof c-m-around_x-large'
            },
            {
                id: 'Tile Roof',
                name: 'Tile Roof',
                image: '/Resources/Illustration/Roofing_4B.svg',
                className: this.props.screenValue?.selectedRoof?.id === 'Tile Roof' ? 'c-solution c-roof c-m-around_x-large c-selected' : 'c-solution c-roof c-m-around_x-large',
            },
            {
                id: 'Flat Roof',
                name: 'Flat Roof',
                image: '/Resources/Illustration/Roofing_4CRoofing_5.svg',
                className: this.props.screenValue?.selectedRoof?.id === 'Flat Roof' ? 'c-solution c-roof c-m-around_x-large c-selected' : 'c-solution c-roof c-m-around_x-large',
                imageStyle: 'width: 12rem;margin: 0 auto;'
            }
        ]
    }
}