var express = require('express');
var router = express.Router();

const rsc = {
  title: 'Test'
};


/* Landing page */
router.get('/', function(req, res, next) {
  res.render('index', rsc);
});


/* Portfolio page */
router.get('/portfolio', function(req, res, next) {
  res.render('portfolio/index', {
    title: 'Portfolio',
  });
});

/* Portfolio page */
router.get('/portfolio/about', function(req, res, next) {
  res.render('portfolio/about', {
    title: 'About',
  });
});

/* Portfolio page */
router.get('/portfolio/contact', function(req, res, next) {
  res.render('portfolio/contact', {
    title: 'Contact',
  });
});


module.exports = router;