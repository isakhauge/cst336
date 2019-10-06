import * as f from '../functions/functions.js';
import {UnsplashImage} from "./UnsplashImage.js";

window.addEventListener('load', function (e) {
	window.customElements.define('unsplash-img', UnsplashImage);
	f.debug('Imported components', 'Defined.', 'success');
});