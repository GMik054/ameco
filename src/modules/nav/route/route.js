import { LightningElement, api, track } from 'lwc';
import {dispatchEvent, registerListener,getRouteMatch,REGISTER_GET_LOCATION_EVENT_NAME, REGISTER_ROUTER_EVENT_NAME, REGISTER_GET_QUERY_EVENT_NAME, REGISTER_SWITCH_EVENT_NAME, REGISTER_GET_PARAM_EVENT_NAME, REGISTER_GET_ROUTE_MATCH_EVENT_NAME} from 'nav/lwcRouterUtil';
export default class Route extends LightningElement {
    @api path;
    @api exact = false;
    @track currentPath;
    @track switchInstance;
    @track routerInstance;
    @track isPathMatching = false;
    @track matcher;
    unsubscribe;
    parentPath;

    async connectedCallback(){
        await getRouteMatch(this, ({path, url}) => {
            this.parentPath = path;
            this.parentUrl = url;
            if(this.path.indexOf(':path') > -1){
                this.path = this.path.replace(':path', this.parentPath ? this.parentPath : '');
            }
        })
        registerListener(REGISTER_GET_PARAM_EVENT_NAME, this, this.getParam.bind(this));
        registerListener(REGISTER_GET_QUERY_EVENT_NAME, this, this.getQuery.bind(this));
        registerListener(REGISTER_GET_ROUTE_MATCH_EVENT_NAME, this, this.getRouteMatch.bind(this));
        registerListener(REGISTER_GET_LOCATION_EVENT_NAME, this, this.getLocation.bind(this));
        await dispatchEvent(REGISTER_SWITCH_EVENT_NAME, this, (switchInstance) => {
            this.switchInstance = switchInstance;
            this.unsubscribe = this.switchInstance.subscribe(this,this.handleChange.bind(this))
        })

        await dispatchEvent(REGISTER_ROUTER_EVENT_NAME, this, async (routerInstance) => {
            this.routerInstance = routerInstance;
            this.currentPath = this.routerInstance.currentPath;
        })

        this.template.addEventListener("lwc-router_handle_link_click", this.handleLinkClick.bind(this));

    }

    handleLinkClick(event){
        event.stopPropagation();
        let to = event.detail.to;
        if (to.indexOf(':url') > -1) {
            to = to.replace(':url', this.parentUrl ? this.parentUrl : '');
        }
        if (to) {
            this.routerInstance.currentPath = to;
            this.currentPath = to;
        }
    }
    getParam(event){
        let callback = event.detail;
        if(this.matcher){
            callback(this.matcher.urlParam);
        }else{
            callback({});
        }
        event.stopPropagation();
    }
    getQuery(event){
        let callback = event.detail;
        if(this.matcher){
            callback(this.matcher.queryParam);
        }else{
            callback({});
        }
        event.stopPropagation();
    }
    getRouteMatch(event){
        let callback = event.detail;
        callback({path : this.path, url : this.matcher.url});
        event.stopPropagation();
    }
    getLocation(event){
        let callback = event.detail;
        callback({pathname : this.switchInstance.currentPath});
        event.stopPropagation();
    }

    disconnectedCallback(){
        if(this.unsubscribe){
            this.unsubscribe.unsubscribe();
        }
    }
    handleChange(matcher){
        if(!matcher){
            this.isPathMatching = false;
        }else{
            this.matcher = matcher;
            this.isPathMatching = matcher.isMatching;
        }

        //this.currentPath = this.switchInstance.currentPath;
        //this.matcher = matchPath(this.path, this.currentPath, this.exact);
        //this.isPathMatching = this.matcher.isMatching;
        //return this.matcher.isMatching;
    }
    get renderChild(){
        return this.isPathMatching;
    }
}