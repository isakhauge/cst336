import * as f from '../functions/functions.js';

export class UnsplashImage extends HTMLElement{

	constructor(){
		super();
		this.src = null;
		this.aspectRatio = null;
		this.likes = null;
		this.alt = null;

		// Statistics elements:
		this.statsContainer = f.make('div');
		this.icon = f.make('i');
		this.numLikes = f.make('small');

		// Configure elements:
		this.statsContainer.setAttribute('class', 'stats');
		this.icon.setAttribute('class', 'material-icons');

		f.cout('Constructor invoked');
	}

	static rsc(){
		return {
			attribute: {
				source: 'data-src',
				aspectRatio: 'data-aspect-ratio',
				likes: 'data-likes',
				alt: 'aria-label',
			},
			icon: {
				noLikes: 'favorite_border',
				likes: 'favorite',
				manyLikes: 'whatshot'
			}
		}
	};

	static get observedAttributes(){
		return Object.values(UnsplashImage.rsc().attribute);
	};

	render() {
		this.style.backgroundImage = `url(${this.src})`;
	}

	connectedCallback(){
		if (this.isConnected) {
			this.render();
			this.statsContainer.append(this.icon, this.numLikes);
			this.append(this.statsContainer);
		}
		f.cout('Conected Callback invoked');
	};

	attributeChangedCallback(attrName, oldVal, newVal){
		const a = UnsplashImage.rsc().attribute;
		switch (attrName) {
			case a.source:
				this.src = (newVal !== oldVal) ? newVal : oldVal;
				break;
			case a.likes:
				this.likes = (newVal !== oldVal) ? newVal : oldVal;
				this.numLikes.innerText = this.likes;
				if (parseInt(this.likes) === 0)
					this.icon.innerText = UnsplashImage.rsc().icon.noLikes;
				else if (parseInt(this.likes) < 1000)
					this.icon.innerText = UnsplashImage.rsc().icon.likes;
				else this.icon.innerText = UnsplashImage.rsc().icon.manyLikes;
				break;
			case a.aspectRatio:
				this.aspectRatio = (newVal !== oldVal) ? newVal : oldVal;
				break;
			case a.alt:
				this.alt = (newVal !== oldVal) ? newVal : oldVal;
				break;
			default:
				break;
		}
	};

}

