import {ACTION_SET_SOLUTION, ACTION_SET_SCREEN, ACTION_SET_SCREEN_VALUE, ACTION_SET_CONFIGURATION_VALUE} from 'utility/reduxConstants';
import { getConfiguration, saveCalulation, getProductImage } from "@salesforce/apex";

export const getConfigurationData = () => {
    return dispatch => {
        getConfiguration()
        .then(result => {
            if (result.isSuccess) {

                let data = JSON.parse(result.data)

                dispatch({
                    type: ACTION_SET_CONFIGURATION_VALUE,
                    payload: {data: data}
                });

                dispatch(getProductImageData(data))
            } else {
                console.log(result);
            }
        })
        .catch(error => {
            console.log(error);
        });
    };
}

export const getProductImageData = (data) => {
    return async dispatch => {

        let solarPanels = data.solarPanels;
        
        for(let solarPanel of solarPanels){
            let result = await getProductImage(solarPanel.id).then(result => result)
            if(result.isSuccess){
                solarPanel.imageB64 = JSON.parse(result.data);
            }
        }
        data.solarPanels = solarPanels;

        let batteries = data.batteries;

        for(let battary of batteries){
            let result = await getProductImage(battary.id).then(result => result)
            if(result.isSuccess){
                battary.imageB64 = JSON.parse(result.data);
            }
        }
        data.batteries = batteries;

        let roofMaterials = data.roofMaterial;

        for(let roofMaterial of roofMaterials){
            let result = await getProductImage(roofMaterial.id).then(result => result)
            if(result.isSuccess){
                roofMaterial.imageB64 = JSON.parse(result.data);
            }
        }
        data.roofMaterial = roofMaterials;

        let insulations = data.insulation;

        for(let insulation of insulations){
            let result = await getProductImage(insulation.id).then(result => result)
            if(result.isSuccess){
                insulation.imageB64 = JSON.parse(result.data);
            }
        }
        data.insulation = insulations;

        dispatch({
            type: ACTION_SET_CONFIGURATION_VALUE,
            payload: {data: data}
        });
    };
}

export const saveCalulationData = (data, callback) => {
    return dispatch => {
        saveCalulation(data)
        .then(result => {
            callback(result)
        })
        .catch(error => {
            alert('error')
        });
    };
}

export const setSolution = (solutionName, navigationOptions) => {
	return dispatch => {
		dispatch({
            type: ACTION_SET_SOLUTION,
            payload: {solutionName, navigationOptions}
        });

        if(navigationOptions.length > 0){
            dispatch(setScreen(navigationOptions[0].link));
        }
    }
};

export const setScreen = (screenName) => {
	return dispatch => {
		dispatch({
            type: ACTION_SET_SCREEN,
            payload: {screenName}
        });
	};
};

export const setScreenValue = (screenName, value) => {
	return dispatch => {
		dispatch({
            type: ACTION_SET_SCREEN_VALUE,
            payload: {screenName, value}
        });
	};
};


