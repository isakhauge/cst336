import * as f from '../functions.js';

const QUERY_PARAM = 'view';
const BASE_URL_IMAGE = 'https://en.wikipedia.org/api/rest_v1/page/media/';
const BASE_URL_SUMMARY = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const ENTITY_QUERIES = {
	sun: 'Sun',
	mercury: 'Mercury_(planet)',
	venus: 'Venus',
	earth: 'Earth',
	mars: 'Mars',
	jupiter: 'Jupiter',
	saturn: 'Saturn',
	uranus: 'Uranus',
	neptune: 'Neptune',
};

function getQuery(param) {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(param);
}

function getImage(query, callback) {
	f.ajaxFetch('', BASE_URL_IMAGE + query, function(raw) {
		if (f.isJSON(raw)) {
			const obj = JSON.parse(raw);
			f.cout(query + ' image fetched from Wikipedia', 'primary');
			callback(obj.items[0].thumbnail.source);
		}
	});
}

function getInfo(query, callback) {
	f.ajaxFetch('', BASE_URL_SUMMARY + query, function(raw) {
		if (f.isJSON(raw)) {
			const obj = JSON.parse(raw);
			f.cout(query + ' info fetched from Wikipedia', 'primary');
			callback(obj.title, obj.extract);
		}
	});
}

function createEntityElement(name, imgUrl, summary) {
	return `
		<div class="bg-light p-4 shadow rounded border">
			<h1 class="mt-0 mb-3">${name}</h1>
			<div class="bg-black w-100 text-center">
				<img src="${imgUrl}" alt="Image of ${name}">
			</div>
			<p class="mt-4 mb-0">${summary}</p>
		</div>
	`;
}

function createIntroElement() {
	return `
		<div>
			<h1 class="text-center">Lab 6: Solar System</h1>
			<h2 class="text-center h3 font-weight-light">Choose a planet from the navigation menu</h2>
			<h3 class="text-center mt-3 h6 font-weight-light">This Node app is powered by Wikipedia Rest API</h3>
		</div>
	`;
}

function resetContent(callback) {
	const content = f.get('#content');
	while (content.hasChildNodes())
		content.firstChild.remove();
	callback();
}

function insertElement(element) {
	resetContent(function() {
		const content = f.get('#content');
		content.innerHTML = element;
	});
}

function onLoad() {
	f.cout('JS Module Loaded', 'success');
	const query = getQuery(QUERY_PARAM);
	if (query) {
		if (Object.values(ENTITY_QUERIES).includes(query)) {
			getInfo(query, function (title, summary) {
				getImage(query, function (imgUrl) {
					insertElement(
						createEntityElement(title, imgUrl, summary)
					);
				});
			});
		}
	} else {
		insertElement(
			createIntroElement()
		);
	}
}

window.addEventListener('load', onLoad);