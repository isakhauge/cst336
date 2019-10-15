import * as f from '../functions/functions.js';
import {UnsplashImage} from "./UnsplashImage.js";
import {PixabayImage} from "./PixabayImage.js";

window.addEventListener('load', function (e) {
	window.customElements.define('unsplash-img', UnsplashImage);
	window.customElements.define('pixabay-img', PixabayImage);
	f.cout('Custom components defined', 'success');
});