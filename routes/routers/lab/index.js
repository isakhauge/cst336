const CDN = require('../../../res/data/vendor/cdn');
const express = require('express');
const labRouter = express.Router();
const lab7 = require('../../../res/lab/lab7/lab7');
const routerLab8 = require('./lab8/routerLab8');
const routerLab9 = require('./lab9/routerLab9');
const routerLab10 = require('../lab/lab10/routerLab10');

/*
* Lab
* */

// * Flexbox
labRouter.get('/flexbox', function (req, res, next) {
	res.render('pages/lab/flexbox/index', {
		title: 'CST 238: Lab, Flexbox',
	});
});




// * Hidden cat
labRouter.get('/hiddencat', function (req, res, next) {
	res.render('pages/lab/hiddencat/index', {
		title: 'CST 238: Lab',
		css: [CDN.css.bootstrap]
	});
});




// * Hidden cat
labRouter.get('/jquery-challenge', function (req, res, next) {
	res.render('pages/lab/jquery-challenge/index', {
		title: 'CST 238: Lab, jQuery Challenge',
		css: [CDN.css.bootstrap]
	});
});




// * Contact list
labRouter.get('/contactlist', function (req, res, next) {
	res.render('pages/lab/contactlist/index', {
		title: 'CST 238: Lab',
		css: [CDN.css.bootstrap]
	});
});




// * JS Gussing Numbers
labRouter.get('/jsguess', function (req, res, next) {
	res.render('pages/lab/jsguess/index', {
		title: 'CST 238: Lab, JS guessing numbers',
		css: [CDN.css.bootstrap],
		js: [CDN.js.jquery]
	});
});




// * AJAX
labRouter.get('/ajax', function (req, res, next) {
	res.render('pages/lab/ajax/index', {
		title: 'CST 336: Lab, AJAX',
		css: [CDN.css.bootstrap],
		js: [CDN.js.jquery]
	});
});




// * Quiz
labRouter.get('/us-geo-quiz', function (req, res, next) {
	res.render('pages/lab/us-geo-quiz/index', {
		title: 'CST 336: Lab, JS Geography Quiz',
		css: [CDN.css.bootstrap],
		js: [CDN.js.jquery]
	});
});




// * jQuery Challenge
labRouter.get('/jquery-challenge', function (req, res, next) {
	res.render('pages/lab/jquery-challenge/index', {
		title: 'CST 336: Lab, jQuery Challenge',
		css: [CDN.css.bootstrap],
		js: [CDN.js.jquery]
	});
});




// * Pixabay API
const pixabay = function(html = '', notFound = '') {
	return {
		title: 'CST 336: Lab 5, Pixabay API',
		js: {
			jquery: CDN.js.jquery
		},
		css: {
			bootstrap: CDN.css.bootstrap,
			custom: {src: '/stylesheets/project_specific/lab5.css'},
		},
		font: {
			roboto: CDN.font.roboto,
			materialIcons: CDN.font.materialIcons,
		},
		images: html,
		notFound: notFound,
	}
};

// Get router.
labRouter.get('/pixabay', async function (req, res, next) {

	// Predefined array with keywords.
	const keywords = ['flower', 'landscape', 'mountain', 'bird'];

	// Pick random index from array.
	const index = lab7.randomRange(0, keywords.length - 1);

	// Get keyword.
	const keyword = keywords[index];

	// Get images.
	const html = await lab7.searchImage(keyword, 'horizontal');

	// ? If html is corrupted.
	if (!html) res.render('pages/lab/pixabay/index', pixabay('', lab7.makeNothingFoundElement(keyword)));
	else res.render('pages/lab/pixabay/index', pixabay(html, ''));
});

// Post router.
labRouter.post('/pixabay', async (req, res, next) => {
	const {value, orientation} = req.body;
	const html = await lab7.searchImage(value, orientation);
	if (!html)
		res.render('pages/lab/pixabay/index', pixabay('', lab7.makeNothingFoundElement(value)));
	else
		res.render('pages/lab/pixabay/index', pixabay(html, ''));
});




// * Lab 6: Solar System App.
const solarSystem = {
	title: 'CST 336: Lab 6, Solar System',
	js: CDN.js.jquery,
	css: {
		bootstrap: CDN.css.bootstrap,
		custom: {src: '/stylesheets/project_specific/lab5.css'},
	},
	font: {
		roboto: CDN.font.roboto,
		materialIcons: CDN.font.materialIcons,
	},
	navbar: '<nav class="navbar sticky-top navbar-expand-md navbar-light bg-light"><a class="navbar-brand" href="/lab/solar-system">Solar System</a><button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="navbarNav"><ul class="navbar-nav"><li class="nav-item"><a class="nav-link" href="/lab/solar-system?view=Sun">Sun</span></a></li><li class="nav-item"><a class="nav-link" href="/lab/solar-system?view=Mercury_(planet)">Mercury</span></a></li><li class="nav-item"><a class="nav-link" href="/lab/solar-system?view=Venus">Venus</span></a></li><li class="nav-item"><a class="nav-link" href="/lab/solar-system?view=Earth">Earth</span></a></li><li class="nav-item"><a class="nav-link" href="/lab/solar-system?view=Mars">Mars</span></a></li><li class="nav-item"><a class="nav-link" href="/lab/solar-system?view=Jupiter">Jupiter</span></a></li><li class="nav-item"><a class="nav-link" href="/lab/solar-system?view=Saturn">Saturn</span></a></li><li class="nav-item"><a class="nav-link" href="/lab/solar-system?view=Uranus">Uranus</span></a></li><li class="nav-item"><a class="nav-link" href="/lab/solar-system?view=Neptune">Neptune</span></a></li></ul></div></nav>',
	footer: '<footer class="bg-dark py-3"> <section> <div class="container"> <p class="text-white text-center small m-0"> CST 336 - Internet Programming<br>The content on this website is written by Isak Hauge<br>&copy;<span id="year"></span>. All rights reserved.</p> <script>window.onload=function(){document.getElementById("year").innerText = new Date().getFullYear().toString();}</script> </div> </section> </footer>',
};

// Landing.
labRouter.get('/solar-system', function (req, res, next) {
	res.render('pages/lab/solar-system/index', solarSystem);
});

// Sun.
labRouter.get('/solar-system?view=Sun', function (req, res, next) {
	res.render('pages/lab/solar-system/index', solarSystem);
});

// Mercury.
labRouter.get('/solar-system?view=Mercury_(planet)', function (req, res, next) {
	res.render('pages/lab/solar-system/index', solarSystem);
});

// Venus.
labRouter.get('/solar-system?view=Venus', function (req, res, next) {
	res.render('pages/lab/solar-system/index', solarSystem);
});

// Earth
labRouter.get('/solar-system?view=Earth', function (req, res, next) {
	res.render('pages/lab/solar-system/index', solarSystem);
});

// Mars.
labRouter.get('/solar-system?view=Mars', function (req, res, next) {
	res.render('pages/lab/solar-system/index', solarSystem);
});

// Jupiter.
labRouter.get('/solar-system?view=Jupiter', function (req, res, next) {
	res.render('pages/lab/solar-system/index', solarSystem);
});

// Saturn.
labRouter.get('/solar-system?view=Saturn', function (req, res, next) {
	res.render('pages/lab/solar-system/index', solarSystem);
});

// Uranus.
labRouter.get('/solar-system?view=Uranus', function (req, res, next) {
	res.render('pages/lab/solar-system/index', solarSystem);
});

// Neptune.
labRouter.get('/solar-system?view=Neptune', function (req, res, next) {
	res.render('pages/lab/solar-system/index', solarSystem);
});




// * Lab 8: US Geography Quiz (updated)
labRouter.use('/lab8-us-geo-quiz', routerLab8);



// * Lab 9: Inspirational lab9-quotes
labRouter.use('/lab9', routerLab9);


// * Lab 10: Admin page for inspirational quotes.
labRouter.use('/lab10', routerLab10);

module.exports = labRouter;