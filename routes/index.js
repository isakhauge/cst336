var express = require('express');
var router = express.Router();

const bootstrap = '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">';


/* Landing page */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'CST 238',
  });
});




/*
* Lab */

// Hidden cat
router.get('/lab/hiddencat', function (req, res, next) {
  res.render('lab/hiddencat/index', {
    title: 'CST 238: Lab',
    css: bootstrap,
  });
});

// Contact list
router.get('/lab/contactlist', function (req, res, next) {
  res.render('lab/contactlist/index', {
    title: 'CST 238: Lab',
    css: bootstrap,
  });
});

// JS Gussing Numbers
router.get('/lab/jsguess', function (req, res, next) {
  res.render('lab/jsguess/index', {
    title: 'CST 238: Lab, JS guessing numbers',
    css: bootstrap,
  });
});




/*
* Portolio Page:
* */

const portfolio = {
  title: 'Isak Hauge: Personal Portfolio',
  css: '<link rel="stylesheet" href="/stylesheets/project_specific/portfolio.css">',
  fonts: '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Pacifico&display=swap">',
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




/*
* Project 1: HTML & CSS
* */

const project1 = {
  title: 'CST 336: Project 1',
  css: '<link rel="stylesheet" href="/stylesheets/style.css">',
  fonts: '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono:100,300,400,500,700%7CRoboto:100,300,400,500,700,900&display=swap">',
  navbar: '<nav> <div class="container"> <div class="navbar navbar-sticky"> <div class="brand"> Isak Hauge </div> <div class="nav-menu-container"> <div class="nav-menu"> <a href="/project1">Summary</a> <a href="/project1/custom-properties">CSS Custom Properties</a> <a href="/project1/syntax">Syntax</a> <a href="/project1/examples">Examples</a> <a href="/project1/compatibility">Compatibility</a> </div> <div class="hamburger"> <div class="cheese"></div> <div class="patty"></div> <div class="salad"></div> </div> </div> </div> </div> </nav>',
  banner: '<section style="height: 300px"> <h1 class="text-transparent">Tutorial - CSS Variables for Beginners</h1> <img src="/images/project1/banner.png" alt="Banner image"> </section>',
  footer: '<footer class="bg-darker"> <section> <div class="container"> <p class="text-white text-center small"> CST 336 - Internet Programming<br>The content on this website is written by Isak Hauge<br>&copy;<span id="year"></span>. All rights reserved.</p> <script>window.onload=function(){document.getElementById("year").innerText = new Date().getFullYear().toString();}</script> </div> </section> </footer>',
};

router.get('/project1', function(req, res, next) {
  res.render('project1/index', project1);
});

router.get('/project1/custom-properties', function(req, res, next) {
  res.render('project1/custom-properties', project1);
});

router.get('/project1/syntax', function(req, res, next) {
  res.render('project1/syntax', project1);
});

router.get('/project1/examples', function(req, res, next) {
  res.render('project1/examples', project1);
});

router.get('/project1/compatibility', function(req, res, next) {
  res.render('project1/compatibility', project1);
});

module.exports = router;