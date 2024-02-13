import { LightningElement, api, track } from 'lwc';
import { REGISTER_ROUTER_EVENT_NAME, dispatchEvent, getRouteMatch } from 'nav/lwcRouterUtil';

export default class Link extends LightningElement {
    @api label;
    @api to = '*';
    @api variant = 'base';
    @api title;
    @api pageTitle;
    @track routerInstance;
    @track currentPath;
    @track unsubscribe;
    @track parentUrl;
    parentUrl
    _slottedElement;
    _activeClass = ['link-active-class'];

    @api
    get active() {
        return !!this._active;
    }
    set active(value) {
        this._active = !!value;
        this.toggleActiveAttributes(this._active);
        if(this._active && this.pageTitle){
            window.document.title = this.pageTitle;
        }
    }

    @api
    get activeClass() {
        return this._activeClass || [];
    }
    set activeClass(value) {
        this._activeClass = String(value).split(' ').filter(value => !!value);
    }

    async connectedCallback() {
        await getRouteMatch(this, ({ path, url }) => {
            this.parentUrl = url;
            if (this.to.indexOf(':url') > -1) {
                this.to = this.to.replace(':url', this.parentUrl ? this.parentUrl : '');
            }
        })
        await dispatchEvent(REGISTER_ROUTER_EVENT_NAME, this, async (routerInstance) => {
            this.routerInstance = routerInstance;
            this.currentPath = this.routerInstance.currentPath;
            this.unsubscribe = this.routerInstance.subscribe(this, this.setCurrentPath.bind(this))
            this.active = this.currentPath === this.to;
        })
    }
    renderedCallback() {
        this.captureSlottedElement();
    }
    disconnectedCallback() {
        if (this.unsubscribe) {
            this.unsubscribe.unsubscribe();
        }
    }
    handleClick(e) {
        e.stopPropagation();
        if (this.to) {
            this.routerInstance.currentPath = this.to;
            this.currentPath = this.to;
        }
    }
    handleSlotChange() {
        this.captureSlottedElement();
        this.toggleActiveAttributes();
    }
    setCurrentPath() {
        this.currentPath = this.routerInstance.currentPath;
        this.active = this.currentPath === this.to;
    }
    captureSlottedElement() {
        this._slottedElement = this.querySelector('*');
    }
    toggleActiveAttributes() {
        if (this.active) {
            this.setAttribute("active", "");
            this.applyActiveClassTo(this._slottedElement);
        } else {
            this.removeAttribute("active");
            this.removeActiveClassFrom(this._slottedElement);
        }
    }
    applyActiveClassTo(element) {
        if (!element) return;
        this.activeClass.forEach(activeClass => element.classList.add(activeClass));
    }
    removeActiveClassFrom(element) {
        if (!element) return;
        this.activeClass.forEach(activeClass => element.classList.remove(activeClass));
    }
}
