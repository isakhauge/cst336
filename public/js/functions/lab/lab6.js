import * as f from '../functions.js';

const QUERY_PARAM = 'view';
const BASE_URL = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const SOLAR_SYSTEM_OBJECT_QUERIES = {
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

function getInfo(query, callback) {
	f.ajaxFetch('', BASE_URL + query, function(raw) {
		if (f.isJSON(raw)) {
			const obj = JSON.parse(raw);
			f.cout(query + ' fetched from Wikipedia', 'primary');
			callback(obj.title, obj.thumbnail.source, obj.extract);
		}
	});
}

function createSolarSystemObject(name, imgUrl, summary) {
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
			<h2 class="text-center h3 font-weight-light">Choose an object from the navigation menu</h2>
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
		if (Object.values(SOLAR_SYSTEM_OBJECT_QUERIES).includes(query)) {
			getInfo(query, function (title, imgUrl, summary) {
				insertElement(
					createSolarSystemObject(title, imgUrl, summary)
				);
			});
		}
	} else {
		insertElement(
			createIntroElement()
		);
	}
}

window.addEventListener('load', onLoad);