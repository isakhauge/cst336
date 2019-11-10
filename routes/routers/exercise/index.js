const CDN = require('../../../res/data/vendor/cdn');
const express = require('express');
const exerciseRouter = express.Router();

/*
* Exercise: Promises
* */
exerciseRouter.get('/promises', function(req, res, next) {
	res.render('pages/exercises/promises', {
		title: 'Exercise: Promises',
		css: {
			bootstrap: CDN.css.bootstrap
		},
		js: {
			jquery: CDN.js.jquery
		},
	});
});

module.exports = exerciseRouter;