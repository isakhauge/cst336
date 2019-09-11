var express = require('express');
var router = express.Router();


/* Landing page */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'CST 238',
  });
});




/*
* Portolio Page:
* */

const portfolio = {
  title: 'Isak Hauge: Personal Portfolio',
  css: '/stylesheets/portfolio.css',
  fonts: 'https://fonts.googleapis.com/css?family=Pacifico&display=swap',
};

/* Portfolio page */
router.get('/portfolio', function(req, res, next) {
  res.render('portfolio/index', portfolio);
});

/* Portfolio page */
router.get('/portfolio/about', function(req, res, next) {
  res.render('portfolio/about', portfolio);
});

/* Portfolio page */
router.get('/portfolio/contact', function(req, res, next) {
  res.render('portfolio/contact', portfolio);
});

module.exports = router;