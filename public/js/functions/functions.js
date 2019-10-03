/**
 * Console Out.
 *
 * @description This function simplifies the console log
 * function.
 *
 * @param {string} msg - The message.
 * @param {string} colorName - The color.
 * */
export function cout(msg, colorName = '') {

	// * Init. object of standard Bootstrap colors.
	const color = {
		primary:      '#007bff',
		secondary:    '#6c757d',
		success:      '#28a745',
		danger:       '#dc3545',
		warning:      '#ffc107',
		info:         '#17a2b8',
		muted:        '#6c757d',
		light:        '#f8f9fa',
		dark:         '#343a40',
		white:        '#ffffff',
		white50:      'rgba(255,255,255,.5)',
		black50:      'rgba(0,0,0,.5)',
		none:         'rgba(0,0,0,0)',
		border: {
			light: 'rgba(255,255,255,0.2)',
			dark: 'rgba(0,0,0,0.2)'
		}
	};

	// * Init. color combination object.
	const combo = {color: '', background: '', border: ''};

	switch (colorName) {
		case Object.keys(color)[0]:
			combo.color = color.white;
			combo.background = color.primary;
			combo.border = color.border.light;
			break;
		case Object.keys(color)[1]:
			combo.color = color.white;
			combo.background = color.secondary;
			combo.border = color.border.dark;
			break;
		case Object.keys(color)[2]:
			combo.color = color.white;
			combo.background = color.success;
			combo.border = color.border.light;
			break;
		case Object.keys(color)[3]:
			combo.color = color.light;
			combo.background = color.danger;
			combo.border = color.border.light;
			break;
		case Object.keys(color)[4]:
			combo.color = color.dark;
			combo.background = color.warning;
			combo.border = color.border.dark;
			break;
		case Object.keys(color)[5]:
			combo.color = color.light;
			combo.background = color.info;
			combo.border = color.border.light;
			break;
		case Object.keys(color)[6]:
			combo.color = color.white50;
			combo.background = color.muted;
			combo.border = color.border.light;
			break;
		case Object.keys(color)[7]:
			combo.color = color.dark;
			combo.background = color.light;
			combo.border = color.border.dark;
			break;
		case Object.keys(color)[8]:
			combo.color = color.light;
			combo.background = color.dark;
			combo.border = color.border.light;
			break;
		case Object.keys(color)[9]:
			combo.color = color.dark;
			combo.background = color.white;
			combo.border = color.border.dark;
			break;
		default:
			combo.color = color.light;
			combo.background = color.dark;
			combo.border = color.border.light;
			break;
	}

	console.log(
		'%c' + msg,
		'color: ' + combo.color + ';' +
		'background: ' + combo.background + ';' +
		'padding: 4px 6px;' +
		'border-radius: 5px;' +
		'border: 3px solid ' + combo.border + ';'
	);

}

export function colors() {
	return {
		PRIMARY:      '#007bff',
		SECONDARY:    '#6c757d',
		SUCCESS:      '#28a745',
		DANGER:       '#dc3545',
		WARNING:      '#ffc107',
		INFO:         '#17a2b8',
		NUTED:        '#6c757d',
		LIGHT:        '#f8f9fa',
		DARK:         '#343a40',
		WHITE:        '#ffffff',
		HWITE50:      'rgba(255,255,255,.5)',
		HVITE50:      'rgba(0,0,0,.5)',
		BLACK50:			'rgba(0,0,0,0)',
		border: {
			LIGHT: 'rgba(255,255,255,0.2)',
			DARK: 'rgba(0,0,0,0.2)'
		},
	}
}

export function debug(object, message, color=''){
	console.log(
		'%c' + object.name + ': ' +
		'%c' + msg,
		'font-weight: 700pt',
		'color: ' + combo.color + ';' +
		'background: ' + combo.background + ';' +
		'padding: 4px 6px;' +
		'border-radius: 5px;' +
		'border: 3px solid ' + combo.border + ';'
	);
}


/**
 * AJAX Fetch
 *
 * @author Isak Hauge
 *
 * @param {string} searchValue - The search value.
 * @param {string} url - The path and filename of the PHP AJAX handler.
 * @param {function} callback - A callback function.
 * */
export function ajaxFetch(searchValue, url, callback){

	// Instantiate AJAX object.
	const AJAX = new XMLHttpRequest();

	// Init. on-ready event handler.
	AJAX.onreadystatechange = function () {

		// ? If data was successfully received.
		if (this.readyState === 4 && this.status === 200) {

			// Send debug message to console.
			console.log('AJAX request initiated.');

			// Callback.
			callback(this.responseText);

		}

	};

	// Open connection to PHP file.
	AJAX.open('GET', url + searchValue, true);

	// Send data through GET API.
	AJAX.send();

}


/**
 * AJAX Send JSON
 * */
export function ajaxJSON(jsonObject, url, callback){

	const xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200){
			callback(this.responseText);
		}
	};

	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(jsonObject));

}


/**
 * Is JSON.
 *
 * @description This function will return a boolean value based on whether the given string
 * data is JSON format compliant.
 *
 * @param {string} data - The data string to be analyzed.
 * @returns {boolean}
 * */
export function isJSON(data) {

	try {

		const testObject = JSON.parse(data);
		if (Object.values(testObject).length > 0)
			return true;
		else return false;

	} catch (e) {

		return false;

	}

}


/**
 * Get
 * @param selector
 * @returns {HTMLElement}
 */
export function get(selector) {
	return document.querySelector(selector);
}


/**
 * Get All
 * @param selector
 * @returns {NodeListOf<HTMLElementTagNameMap[*]>}
 */
export function getAll(selector) {
	return document.querySelectorAll(selector);
}