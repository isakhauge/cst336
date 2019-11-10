const rsc = require('../../resources');
const express = require('express');
const exerciseRouter = express.Router();

/*
* Exercise: Promises
* */
exerciseRouter.get('/promises', function(req, res, next) {
	res.render('pages/exercises/promises', {
		title: 'Exercise: Promises',
		css: rsc.bootstrap,
		script: rsc.jquery,
	});
});

module.exports = exerciseRouter;