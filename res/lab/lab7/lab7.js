const f = require('../../backendFunctions');

function generateURL (searchValue, orientation) {
	const base = 'https://pixabay.com/api/?key=13852358-3ecb37aed0a4dd2ed5465995d&q=';
	console.log("API Request: " + base + searchValue + '&orientation=' + orientation);
	return base + searchValue + '&orientation=' + orientation;
}

module.exports.randomRange = function (start, end) {
	return Math.round(Math.random() * (end - start) + start);
};

function makePixabayImage(id, src, width, height, aspectRatio, likes, alt) {
	return `
		<pixabay-img
			id="${id}"
			data-src="${src}"
			data-width="${width}"
			data-height="${height}"
			data-aspect-ratio="${aspectRatio}"
			data-likes="${likes}"
			aria-label="${alt}">
		</pixabay-img>
	`;
}

module.exports.makeNothingFoundElement = function(searchValue) {
	return `
		<div class="alert alert-secondary">We could not find anything ${searchValue}</div>
	`;
};

module.exports.parametersDefined = function (requestBody) {
	return (requestBody.value != null && requestBody.orientation != null);
};

module.exports.searchImage = function (searchValue, orientation) {
	return new Promise((resolve, reject) => {
		const url = generateURL(searchValue, orientation);
		f.ajaxFetch(url, '')
		.then((raw) => {
			if (f.isJSON(raw)) {
				const object = JSON.parse(raw);
				if (object.hits.length > 0) {
					if (object.hits.length > 4) {
						let html = '';
						let limit = 4;
						while (limit > 0) {
							const i = module.exports.randomRange(0, object.hits.length - 1);
							const e = object.hits[i];
							html += makePixabayImage(
								e.id,
								e.webformatURL,
								e.imageWidth,
								e.imageHeight,
								parseInt(e.imageHeight / e.imageWidth),
								e.likes,
								e.tags
							);
							limit--;
						}
						resolve(html);
					} else {
						let html = '';
						object.hits.forEach( e => {
							html += makePixabayImage(
								e.id,
								e.webformatURL,
								e.imageWidth,
								e.imageHeight,
								parseInt(e.imageHeight / e.imageWidth),
								e.likes,
								e.tags
							);
						});
						resolve(html);
					}
				} else reject(new Error('Could not find any pictures.'));
			} else reject(new Error('Raw data from server is not JSON.'));
		});
	}).catch((error) => {
		console.error(error);
	});
};