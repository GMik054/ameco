import {ACTION_SET_SOLUTION, ACTION_SET_SCREEN, ACTION_SET_SCREEN_VALUE, ACTION_SET_CONFIGURATION_VALUE} from 'utility/reduxConstants';

//Initial state for the records of the proseeder app
const initialState = {
    selectedSolution: '',
    navigationOptions: [],
    selectedScreen: '',
    configuration: {}
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_SET_CONFIGURATION_VALUE: {
            const payload = action.payload;
			return {
				...state,
				configuration: payload.data
			};
        }
        case ACTION_SET_SOLUTION: {
            const payload = action.payload;
			return {
				...state,
				selectedSolution: payload.solutionName,
                navigationOptions: payload.navigationOptions
			};
        }
        case ACTION_SET_SCREEN: {
            const payload = action.payload;
			return {
				...state,
				selectedScreen: payload.screenName
			};
        }
        case ACTION_SET_SCREEN_VALUE: {
            const payload = action.payload;
            state[payload.screenName] = payload.value;
			return {
				...state,
			};
        }

        
        default:
            return initialState;
    }
};


export default appReducer;