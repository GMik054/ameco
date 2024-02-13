import { LightningElement, api } from 'lwc';

export default class Svg extends LightningElement {
    @api url;
    @api width = "auto";
    @api height = "auto";

    get style(){
        return `width: ${this.width}; height:${this.height};pointer-events: none;`
    }

}