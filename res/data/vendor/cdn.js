const CDN = {

	css: {
		bootstrap: {
			src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
			integrity: 'sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T',
			crossOrigin: 'anonymous',
		},
	},


	font: {
		roboto: {
			src: 'https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700|Roboto+Mono:100,300,400,500,700|Roboto:100,300,400,500,700,900&display=swap',
		},
		materialIcons: {
			src: 'https://fonts.googleapis.com/icon?family=Material+Icons',
		},
	},


	js: {
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
	},
};

module.exports = CDN;