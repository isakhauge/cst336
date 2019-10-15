import * as f from '../functions/functions.js';

export class PixabayImage extends HTMLElement{

	constructor(){
		super();
		this.src = null;
		this.width = null;
		this.height = null;
		this.aspectRatio = null;
		this.likes = null;
		this.alt = null;

		// Image element.
		this.imgContainer = f.make('div');
		this.imgContainer.classList.add('pixabay-img');

		// Statistics elements:
		this.statsContainer = f.make('div');
		this.icon = f.make('i');
		this.numLikes = f.make('small');

		// Configure elements:
		this.statsContainer.setAttribute('class', 'stats');
		this.icon.setAttribute('class', 'material-icons');

		f.cout('PixabayImage Element Created', 'primary');
	}

	static rsc(){
		return {
			attribute: {
				source: 'data-src',
				width: 'data-width',
				height: 'data-height',
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
		return Object.values(PixabayImage.rsc().attribute);
	};

	render() {
		const w = parseFloat(220.0);
		const h = parseFloat(w) * this.getAspectRatio() + 44;
		this.imgContainer.style.width = w + 'px';
		this.imgContainer.style.height = h + 'px';
		this.imgContainer.style.backgroundImage = `url("${this.src}")`;
	}

	connectedCallback(){
		if (this.isConnected) {
			this.render();
			this.statsContainer.append(this.icon, this.numLikes);
			this.append(this.statsContainer, this.imgContainer);
		}
	};

	attributeChangedCallback(attrName, oldVal, newVal){
		const a = PixabayImage.rsc().attribute;
		switch (attrName) {
			case a.source:
				this.src = (newVal !== oldVal) ? newVal : oldVal;
				break;
			case a.likes:
				this.likes = (newVal !== oldVal) ? newVal : oldVal;
				this.numLikes.innerText = this.likes;
				if (parseInt(this.likes) === 0)
					this.icon.innerText = PixabayImage.rsc().icon.noLikes;
				else if (parseInt(this.likes) < 500)
					this.icon.innerText = PixabayImage.rsc().icon.likes;
				else this.icon.innerText = PixabayImage.rsc().icon.manyLikes;
				break;
			case a.width:
				this.width = (newVal !== oldVal) ? newVal : oldVal;
				if (this.height !== null) {
					this.aspectRatio = parseFloat(this.height) / parseFloat(this.width);
					this.setAttribute(a.aspectRatio, this.aspectRatio);
				}
				break;
			case a.height:
				this.height = (newVal !== oldVal) ? newVal : oldVal;
				if (this.width !== null){
					this.aspectRatio = parseFloat(this.height) / parseFloat(this.width);
					this.setAttribute(a.aspectRatio, this.aspectRatio);
				}
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

	getAspectRatio() {
		return parseFloat(this.height / this.width);
	}

}

