import * as f from './functions.js';
import * as jQuery from '../vendors/jquery431.min.js';
import {PixabayImage} from "../components/PixabayImage.js";
jQuery.inject();

// Initial loading indication.
f.debug('Lab 5', 'JS files imported', 'success');


function searchImage(searchValue, orientation, callback) {
	const url = generateURL(searchValue, orientation);
	f.ajaxFetch('', url, function(raw) {
		if (f.isJSON(raw)) {
			const object = JSON.parse(raw);
			resetGrid();
			if (object.hits.length > 0) {
				object.hits.forEach( e => {
					populateImage(
						e.id,
						e.webformatURL,
						e.imageWidth,
						e.imageHeight,
						parseInt(e.imageHeight / e.imageWidth),
						e.likes,
						e.tags
					);
				});
			} else displayNothingFound(searchValue);
			callback(object);
		} else {
			f.cout('Could not find pictures from Pixabay servers.', 'warning');
			displayNothingFound(searchValue);
		}
	});
}

function generateURL(searchValue, orientation) {
	const base = 'https://pixabay.com/api/?key=13852358-3ecb37aed0a4dd2ed5465995d&q=';
	f.cout("API Request: " + base + searchValue + '&orientation=' + orientation, 'warning');
	return base + searchValue + '&orientation=' + orientation;
}

function populateImage(id, src, width, height, aspectRatio, likes, alt) {
	const a = PixabayImage.rsc().attribute;
	const grid = f.get('#grid');
	const elem = f.make('pixabay-img');
	elem.id = id;
	elem.setAttribute(a.source, src);
	elem.setAttribute(a.width, width);
	elem.setAttribute(a.height, height);
	elem.setAttribute(a.aspectRatio, aspectRatio);
	elem.setAttribute(a.likes, likes);
	elem.setAttribute(a.alt, alt);
	grid.append(elem);
}

function displayNothingFound(searchValue) {
	resetGrid();
	const grid = f.get('#search-error');
	const msg = f.make('div', 'We could not find anything about "' + searchValue + '"');
	msg.classList.add('alert', 'alert-secondary');
	grid.append(msg);
}

const ev_searchButtonOnClick = {
	type: 'click',
	listener: initiateSearch,
};

const ev_searchBarOnEnter = {
	type: 'keypress',
	listener: function (e) {
		const key = e.which || e.keyCode;
		if (key === 13)
			initiateSearch(e);
	}
};

function initiateSearch(e) {
	const searchValue = f.get('#search-bar').value;
	const orientation = f.get('#orientation').value;
	if (searchValue.length > 2) {
		searchImage(searchValue, orientation,function(jsonObject) {
			f.cout(Object.values(jsonObject.hits).length + ' images were found.');
		});
	}
}

function resetGrid() {
	const grid = f.get('#grid');
	const searchError = f.get('#search-error');
	f.flushChildren(searchError);
	f.flushChildren(grid);
}

// Window on load:
window.addEventListener('load', function() {
	const buttonSearch = f.get('#search');
	const inputSearch = f.get('#search-bar');
	inputSearch.focus();
	buttonSearch.addEventListener(ev_searchButtonOnClick.type, ev_searchButtonOnClick.listener);
	inputSearch.addEventListener(ev_searchBarOnEnter.type, ev_searchBarOnEnter.listener);
});