const rsc = require('../../resources');
const express = require('express');
const portfolioRouter = express.Router();

/*
* Portolio Page:
* */

const portfolio = {
	title: 'Isak Hauge: Personal Portfolio',
	css: {
		custom: {
			src: '/stylesheets/project_specific/portfolio.css'
		}
	},
	font: {
		pacifico: {
			rsc: 'https://fonts.googleapis.com/css?family=Pacifico&display=swap'
		}
	},
};

/* Portfolio page */
portfolioRouter.get('/', function(req, res, next) {
	res.render('pages/portfolio/index', portfolio);
});

/* Portfolio page */
portfolioRouter.get('/about', function(req, res, next) {
	res.render('pages/portfolio/about', portfolio);
});

/* Portfolio page */
portfolioRouter.get('/contact', function(req, res, next) {
	res.render('pages/portfolio/contact', portfolio);
});

module.exports = portfolioRouter;