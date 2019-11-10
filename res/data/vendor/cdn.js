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
			src: 'https://code.jquery.com/jquery-3.4.1.min.js',
			integrity: 'sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=',
			crossOrigin: 'anonymous',
		}
	},
};

module.exports = CDN;