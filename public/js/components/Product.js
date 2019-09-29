import * as f from '../functions/functions';

export class ContactBox extends HTMLElement{

	constructor(){
		super();
	}

	static rsc(){
		return {
			attribute: {
				name: '',
				price: '',
			}
		}
	};

	static get observedAttributes(){
		return Object.values(Product.rsc().attributes);
	};
	connectedCallback(){};
	disconnectedCallback(){};
	attributeChangedCallback(attrName, oldVal, newVal){};

}