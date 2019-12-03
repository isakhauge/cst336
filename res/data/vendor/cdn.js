const CDN = {

	/*
	* <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
	* */

	css: {
		bootstrap: {
			src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
			integrity: 'sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh',
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
			src: 'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js',
			integrity: 'sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo',
			crossOrigin: 'anonymous',
		},
		bootstrap: {
			id: 'bootstrap-js',
			src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js',
			integrity: 'sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6',
			crossOrigin: 'anonymous',
		}
	},
};

module.exports = CDN;