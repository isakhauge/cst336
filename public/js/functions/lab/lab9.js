import {HTTP, cout, get, getAll, flushChildren} from '../functions.js';
cout('Lab 9 JS Loaded.', 'success');

const js = {
	jquery: {
		id: 'jquery',
		src: 'https://code.jquery.com/jquery-3.4.1.min.js',
		integrity: 'sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=',
		crossOrigin: 'anonymous',
	},
	popper: {
		id: 'popper',
		src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
		integrity: 'sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1',
		crossOrigin: 'anonymous',
	},
	bootstrap: {
		id: 'bootstrap-js',
		src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js',
		integrity: 'sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM',
		crossOrigin: 'anonymous',
	}
};

function injectCode() {
	HTTP.GET(js.jquery.src, function (res) {
		js.jquery.code = res;
		cout('jQuery is loaded.');
		HTTP.GET(js.popper.src, function (res) {
			js.popper.code = res;
			cout('Popper.js has loaded.');
			HTTP.GET(js.bootstrap.src, function (res) {
				js.bootstrap.code = res;
				cout('Bootstrap JS has loaded.');
				Object.values(js).forEach(function (obj) {
					const elem = document.createElement('script');
					elem.id = obj.id;
					elem.innerHTML = obj.code;
					get('body').append(elem);
				});
			});
		});
	});
}

function makeOption(value,text) {
	const elem = document.createElement('option');
	elem.value = value;
	elem.innerText = text;
	return elem;
}

function collectValues(callback) {
	callback ({
		author: get('#author').value,
		quote: get('#quote').value,
		sex: get('#sex').value,
		category: get('#category').value
	});
}

function makeQuote(author, quote, category) {
	return `
		<div class="card p-4">
			<blockquote class="blockquote">
				<p class="quote">${quote}</p>
				<footer class="blockquote-footer">
					<a href class="bio-link" data-toggle="modal" data-target="#author-modal" data-author="${author}">${author}</a>
				</footer>
			</blockquote>
			<div class="quote-keywords">
				<span class="badge badge-secondary font-weight-normal">${category}</span>
			</div>
		</div>
	`;
}

function onBio(e) {
	console.log('On bio clicked');
	const self = e.target;
	const requestbody = {
		name: self.getAttribute('data-author')
	};
	HTTP.POST('/api/lab9/author', requestbody, function(result) {
		const jo = JSON.parse(result)[0];
		console.log(jo);
		get('#portrait').src = jo.portrait;
		get('#author-name').innerText = jo.firstName + ' ' + jo.lastName;
		get('#dob').innerText = jo.dob;
		get('#dod').innerText = jo.dod;
		get('#gender').innerText = jo.sex;
		get('#country').innerText = jo.country;
		get('#profession').innerText = jo.profession;
		get('#bio').innerText = jo.biography;
	});
}

function onSearch() {
	collectValues(function(requestBody) {
		HTTP.POST('/api/lab9/quote', requestBody, function(result) {
			const jsonObj = JSON.parse(result);
			const quoteContainer = get('#quote-container');
			flushChildren(quoteContainer, function () {
				jsonObj.forEach(obj => {
					quoteContainer.innerHTML += makeQuote(obj.Author, obj.quote, obj.category)
				});
				getAllBioLinks(function(bioLinks) {
					setEventListeners(bioLinks, onBio, function() {
						console.log(bioLinks);
					});
				});
			})
		});
	});
}

function getAllBioLinks(callback) {
	callback(getAll('.bio-link'));
}

function setEventListeners(bioLinks, eventListener, callback) {
	bioLinks.forEach(a => {
		a.onclick = eventListener
	});
	callback();
}

window.addEventListener('load', function() {
	injectCode();
	HTTP.GET('/api/lab9/category', function(raw) {
		const jsonObject = JSON.parse(raw);
		const categories = get('#category');
		jsonObject.forEach(obj => {
			categories.append(makeOption(obj.category,obj.category));
		});
		cout(`${jsonObject.length} categories populated`, 'primary');
		get('#search').onclick = onSearch;
	});
});