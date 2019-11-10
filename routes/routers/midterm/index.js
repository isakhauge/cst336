const cdn = require('../../../res/data/vendor/cdn');
const express = require('express');
const midtermRouter = express.Router();

/*
* Midterm Practice
* */
const midtermPractice = {
	title: 'CST 336: Midterm Practice',
	css: {
		bootstrap: cdn.css.bootstrap
	},
	font: {
		roboto: cdn.font.roboto,
		materialIcons: cdn.font.materialIcons
	}
};

midtermRouter.get('/practice', function(req, res, next) {
	res.render('pages/midterm-practice/index', midtermPractice);
});

/*
* Midterm
* */
const midterm = {
	title: 'CST 336: Midterm',
	css: {
		bootstrap: cdn.css.bootstrap
	},
	font: {
		roboto: cdn.font.roboto,
		materialIcons: cdn.font.materialIcons
	}
};

midtermRouter.get('/midterm1', function(req, res, next) {
	res.render('pages/midterm/midterm1/index', midterm);
});

module.exports = midtermRouter;