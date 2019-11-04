const https = require('https');

/**
 * AJAX Fetch
 *
 * @author Isak Hauge
 *
 * @param {string} url - The path and filename of the PHP AJAX handler.
 * @param {string} searchValue - The search value.
 * */
module.exports.ajaxFetch = (url, searchValue) => {
	return new Promise((resolve, reject) => {
		https.get(url + searchValue, (res) => {
			let data = '';

			res.on('data', (chunk) => {
				data += chunk;
			});

			res.on('end', () => {
				resolve(data);
			});

		}).on('error', (err) => {
			reject(err);
		});
	});
};




/**
 * Is JSON.
 *
 * @description This function will return a boolean value based on whether the given string
 * data is JSON format compliant.
 *
 * @param {string} data - The data string to be analyzed.
 * @returns {boolean}
 * */
module.exports.isJSON = function (data) {

	try {

		const testObject = JSON.parse(data);
		return Object.values(testObject).length > 0;

	} catch (e) {

		return false;

	}

};