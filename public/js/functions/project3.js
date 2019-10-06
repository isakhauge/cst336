import * as f from './functions.js';
import {UnsplashImage} from "../components/UnsplashImage.js";

// Initial loading indication.
f.debug('Project 3', 'JS file loaded.', 'success');


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
		} else {
			f.cout('Could not fetch pictures from Unsplash servers.', 'warning');
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
	const searchBar = f.get('#search-bar');
	if (searchBar.value.length > 2) {
		searchImage(searchBar.value, function(jsonObject) {
			console.log(jsonObject);
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
	buttonSearch.addEventListener(ev_searchButtonOnClick.type, ev_searchButtonOnClick.listener);
	inputSearch.addEventListener(ev_searchBarOnEnter.type, ev_searchBarOnEnter.listener);
});