const rsc = require('../../resources');
const express = require('express');
const portfolioRouter = express.Router();

/*
* Portolio Page:
* */

const portfolio = {
	title: 'Isak Hauge: Personal Portfolio',
	css: '<link rel="stylesheet" href="/stylesheets/project_specific/portfolio.css">',
	fonts: '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Pacifico&display=swap">',
};

/* Portfolio page */
portfolioRouter.get('/', function(req, res, next) {
	res.render('portfolio/index', portfolio);
});

/* Portfolio page */
portfolioRouter.get('/about', function(req, res, next) {
	res.render('portfolio/about', portfolio);
});

/* Portfolio page */
portfolioRouter.get('/contact', function(req, res, next) {
	res.render('portfolio/contact', portfolio);
});

module.exports = portfolioRouter;