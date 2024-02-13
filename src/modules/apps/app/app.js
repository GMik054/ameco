import { LightningElement, track } from 'lwc';
import { createStore, combineReducers, createLogger } from "redux/lwcRedux";
import appReducer from "reducers/appReducer";
const ENABLE_LOGGING = true;

export default class App extends LightningElement {
    @track store;
	initialize() {
        let logger;
        
        // Check for the Logging
        if(ENABLE_LOGGING){
            logger = createLogger({
                duration: true,
                diff: true
            });
        }
		const combineReducersInstance = combineReducers({appReducer});
		this.store = createStore(combineReducersInstance, logger);
	}
}