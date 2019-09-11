import * as f from '../functions/functions.js';

export class NavigationBar extends HTMLElement {

    constructor(){
        super();
    }

    static attributes() {
        return {
            logo: 'data-logo',
            menu: 'data-menu'
        }
    }


    static get observedAttributes(){
        return Object.values(NavigationBar.attributes());
    }


    attributeChangedCallback(attrName, oldVal, newVal){
        const attribute = NavigationBar.attributes();
        switch (attrName) {
            case attribute.logo:
                this.setAttribute(attrName, (newVal !== oldVal) ? newVal : oldVal);
                break;
            case attribute.menu:
                this.setAttribute(attrName, (newVal !== oldVal) ? newVal : oldVal);
                break;
            default:
                break;
        }
    }

    connectedCallback() {
        const atr = NavigationBar.attributes();
        const logoAttribute = atr.logo;
        const logoDefined = this.getAttribute(logoAttribute).length > 0;
        const logoAttributeExists = this.getAttribute(logoAttribute) !== null;
        if (logoAttributeExists && !logoDefined)
            f.debug(this, 'Test');
    }


    disconnectedCallback(){

    }

    static rsc(){
        return {
            attributes: {
                default: {
                    logo: ''
                }
            }
        }
    }

}