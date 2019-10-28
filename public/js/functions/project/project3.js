import * as f from '../functions.js';
import {UnsplashImage} from "../../components/UnsplashImage.js";
import * as jQuery from '../../vendors/jquery431.min.js';
jQuery.inject();

// Initial loading indication.
f.debug('Project 3', 'JS files imported', 'success');


function searchImage(searchValue, callback) {
	const url = 'https://api.unsplash.com/photos/search?client_id=7e98612f0283cf4638dde02ee7d4e7e8d357e225cc16c2f1cc08f0d238580ea0&query=';
	f.ajaxFetch(searchValue, url, function(raw) {
		if (f.isJSON(raw)) {
			const object = JSON.parse(raw);
			resetGrid();
			object.forEach( e => {
				populateImage(
					e.id,
					e.urls.regular,
					0.75,
					e.likes,
					e.alt_description
				);
			});
			callback(object);
		} else {
			f.cout('Could not find pictures from Unsplash servers.', 'warning');
			displayNothingFound(searchValue);
		}
	});
}

function populateImage(id, src, aspectRatio, likes, alt) {
	const a = UnsplashImage.rsc().attribute;
	const grid = f.get('#grid');
	const elem = f.make('unsplash-img');
	elem.id = id;
	elem.setAttribute(a.source, src);
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
	if (searchValue.length > 2) {
		searchImage(searchValue, function(jsonObject) {
			f.cout(jsonObject.length.toString() + ' images were found.');
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