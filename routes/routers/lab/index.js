const rsc = require('../../resources');
const express = require('express');
const labRouter = express.Router();

/*
* Lab
* */

// Hidden cat
labRouter.get('/hiddencat', function (req, res, next) {
	res.render('lab/hiddencat/index', {
		title: 'CST 238: Lab',
		css: rsc.bootstrap,
	});
});

// Contact list
labRouter.get('/contactlist', function (req, res, next) {
	res.render('lab/contactlist/index', {
		title: 'CST 238: Lab',
		css: rsc.bootstrap,
	});
});

// JS Gussing Numbers
labRouter.get('/jsguess', function (req, res, next) {
	res.render('lab/jsguess/index', {
		title: 'CST 238: Lab, JS guessing numbers',
		css: rsc.bootstrap,
		script: rsc.jquery,
	});
});

// AJAX
labRouter.get('/ajax', function (req, res, next) {
	res.render('lab/ajax/index', {
		title: 'CST 238: Lab, AJAX',
		css: rsc.bootstrap,
		script: rsc.jquery,
	});
});

// Quiz
labRouter.get('/us-geo-quiz', function (req, res, next) {
	res.render('lab/us-geo-quiz/index', {
		title: 'CST 238: Lab, JS Geography Quiz',
		css: bootstrap,
		script: rsc.jquery,
	});
});

// jQuery Challenge
labRouter.get('/jquery-challenge', function (req, res, next) {
	res.render('lab/jquery-challenge/index', {
		title: 'CST 238: Lab, jQuery Challenge',
		css: rsc.bootstrap,
		script: rsc.jquery,
	});
});

// Pixabay API
labRouter.get('/pixabay', function (req, res, next) {
	res.render('lab/pixabay/index', {
		title: 'CST 238: Lab 5, Pixabay API',
		script: rsc.jquery,
		css: rsc.bootstrap + '<link rel="stylesheet" href="/stylesheets/project_specific/lab5.css" type="text/css">',
		fonts: rsc.materialIcons + '\n' + rsc.robotoFonts,
		footer: '<footer class="bg-dark py-3"> <section> <div class="container"> <p class="text-white text-center small m-0"> CST 336 - Internet Programming<br>The content on this website is written by Isak Hauge<br>&copy;<span id="year"></span>. All rights reserved.</p> <script>window.onload=function(){document.getElementById("year").innerText = new Date().getFullYear().toString();}</script> </div> </section> </footer>',
	});
});

// Lab 6: Solar System App.
const solarSystem = {
	title: 'CST 238: Lab 6, Solar System',
	css: rsc.bootstrap,
	fonts: rsc.materialIcons + '\n' + rsc.robotoFonts,
	navbar: '<nav class="navbar sticky-top navbar-expand-md navbar-light bg-light"><a class="navbar-brand" href="/lab/solar-system">Solar System</a><button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="navbarNav"><ul class="navbar-nav"><li class="nav-item"><a class="nav-link" href="/lab/solar-system?view=Sun">Sun</span></a></li><li class="nav-item"><a class="nav-link" href="/lab/solar-system?view=Mercury_(planet)">Mercury</span></a></li><li class="nav-item"><a class="nav-link" href="/lab/solar-system?view=Venus">Venus</span></a></li><li class="nav-item"><a class="nav-link" href="/lab/solar-system?view=Earth">Earth</span></a></li><li class="nav-item"><a class="nav-link" href="/lab/solar-system?view=Mars">Mars</span></a></li><li class="nav-item"><a class="nav-link" href="/lab/solar-system?view=Jupiter">Jupiter</span></a></li><li class="nav-item"><a class="nav-link" href="/lab/solar-system?view=Saturn">Saturn</span></a></li><li class="nav-item"><a class="nav-link" href="/lab/solar-system?view=Uranus">Uranus</span></a></li><li class="nav-item"><a class="nav-link" href="/lab/solar-system?view=Neptune">Neptune</span></a></li></ul></div></nav>',
	footer: '<footer class="bg-dark py-3"> <section> <div class="container"> <p class="text-white text-center small m-0"> CST 336 - Internet Programming<br>The content on this website is written by Isak Hauge<br>&copy;<span id="year"></span>. All rights reserved.</p> <script>window.onload=function(){document.getElementById("year").innerText = new Date().getFullYear().toString();}</script> </div> </section> </footer>',
};

// Landing.
labRouter.get('/solar-system', function (req, res, next) {
	res.render('lab/solar-system/index', solarSystem);
});

// Sun.
labRouter.get('/solar-system?view=Sun', function (req, res, next) {
	res.render('lab/solar-system/index', solarSystem);
});

// Mercury.
labRouter.get('/solar-system?view=Mercury_(planet)', function (req, res, next) {
	res.render('lab/solar-system/index', solarSystem);
});

// Venus.
labRouter.get('/solar-system?view=Venus', function (req, res, next) {
	res.render('lab/solar-system/index', solarSystem);
});

// Earth
labRouter.get('/solar-system?view=Earth', function (req, res, next) {
	res.render('lab/solar-system/index', solarSystem);
});

// Mars.
labRouter.get('/solar-system?view=Mars', function (req, res, next) {
	res.render('lab/solar-system/index', solarSystem);
});

// Jupiter.
labRouter.get('/solar-system?view=Jupiter', function (req, res, next) {
	res.render('lab/solar-system/index', solarSystem);
});

// Saturn.
labRouter.get('/solar-system?view=Saturn', function (req, res, next) {
	res.render('lab/solar-system/index', solarSystem);
});

// Uranus.
labRouter.get('/solar-system?view=Uranus', function (req, res, next) {
	res.render('lab/solar-system/index', solarSystem);
});

// Neptune.
labRouter.get('/solar-system?view=Neptune', function (req, res, next) {
	res.render('lab/solar-system/index', solarSystem);
});

module.exports = labRouter;