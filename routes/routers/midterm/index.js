const rsc = require('../../resources');
const express = require('express');
const midtermRouter = express.Router();

/*
* Midterm Practice
* */
const midtermPractice = {
	title: 'CST 336: Midterm Practice',
	css: rsc.bootstrap,
	fonts: rsc.materialIcons + '\n' + rsc.robotoFonts
};

midtermRouter.get('/practice', function(req, res, next) {
	res.render('pages/midterm-practice/index', midtermPractice);
});

/*
* Midterm
* */
const midterm = {
	title: 'CST 336: Midterm',
	css: rsc.bootstrap,
	fonts: rsc.materialIcons + '\n' + rsc.robotoFonts
};

midtermRouter.get('/midterm1', function(req, res, next) {
	res.render('pages/midterm/midterm1/index', midterm);
});

module.exports = midtermRouter;