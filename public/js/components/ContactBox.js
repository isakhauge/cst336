import * as f from '../functions/functions';

export class ContactBox extends HTMLElement{

	constructor(){
		super();
	}

	static rsc(){
		return {
			attribute: {
				photo: '',
				name: '',
				address: '',
				phone: '',
				email: '',
			}
		}
	};

	static get observedAttributes(){

	};
	connectedCallback(){};
	disconnectedCallback(){};
	attributeChangedCallback(attrName, oldVal, newVal){};

}