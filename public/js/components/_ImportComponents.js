import * as f from '../functions/functions.js';
import {UnsplashImage} from "./UnsplashImage.js";

window.addEventListener('load', function (e) {
	window.customElements.define('unsplash-img', UnsplashImage);
	f.cout('Custom components defined', 'success');
});