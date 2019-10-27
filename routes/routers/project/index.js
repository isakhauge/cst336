const rsc = require('../../resources');
const express = require('express');
const faker = require('faker');
const projectRouter = express.Router();

/*
* Project 1: HTML & CSS
* */
const fakeInfo = faker.address.country();

const project1 = {
	title: 'CST 336: Project 1',
	css: '<link rel="stylesheet" href="/stylesheets/style.css">',
	fonts: '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono:100,300,400,500,700%7CRoboto:100,300,400,500,700,900&display=swap">',
	navbar: '<nav> <div class="container"> <div class="navbar navbar-sticky"> <div class="brand"> Isak Hauge </div> <div class="nav-menu-container"> <div class="nav-menu"> <a href="/project/project1">Summary</a> <a href="/project/project1/custom-properties">CSS Custom Properties</a> <a href="/project/project1/syntax">Syntax</a> <a href="/project/project1/examples">Examples</a> <a href="/project/project1/compatibility">Compatibility</a> </div> <div class="hamburger"> <div class="cheese"></div> <div class="patty"></div> <div class="salad"></div> </div> </div> </div> </div> </nav>',
	banner: '<section style="height: 300px"> <h1 class="text-transparent">Tutorial - CSS Variables for Beginners</h1> <img src="/images/project1/banner.png" alt="Banner image"> </section>',
	footer: '<footer class="bg-darker"> <section> <div class="container"> <p class="text-white text-center small"> CST 336 - Internet Programming<br>The content on this website is written by Isak Hauge<br>&copy;<span id="year"></span>. All rights reserved.<br>Fake country: ' + fakeInfo + ' (requirement)</p> <script>window.onload=function(){document.getElementById("year").innerText = new Date().getFullYear().toString();}</script> </div> </section> </footer>',
};

projectRouter.get('/project1', function(req, res, next) {
	res.render('project1/index', project1);
});

projectRouter.get('/project1/custom-properties', function(req, res, next) {
	res.render('project1/custom-properties', project1);
});

projectRouter.get('/project1/syntax', function(req, res, next) {
	res.render('project1/syntax', project1);
});

projectRouter.get('/project1/examples', function(req, res, next) {
	res.render('project1/examples', project1);
});

projectRouter.get('/project1/compatibility', function(req, res, next) {
	res.render('project1/compatibility', project1);
});




/*
* Project 2: Shopping Cart
* */

const project2 = {
	title: 'CST 336: Project 2',
	css: '<link rel="stylesheet" href="/stylesheets/style.css"><link rel="stylesheet" href="/stylesheets/project_specific/shopping-cart.css">',
	fonts: '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono:100,300,400,500,700%7CRoboto:100,300,400,500,700,900&display=swap">',
	footer: '<footer class="bg-dark py-3"> <section> <div class="container"> <p class="text-white text-center small m-0"> CST 336 - Internet Programming<br>The content on this website is written by Isak Hauge<br>&copy;<span id="year"></span>. All rights reserved.</p> <script>window.onload=function(){document.getElementById("year").innerText = new Date().getFullYear().toString();}</script> </div> </section> </footer>',
};

projectRouter.get('/project2', function(req, res, next) {
	res.render('project2/index', project2);
});




/*
* Project 3: Third-Party APIs and AJAX
* */
const project3 = {
	title: 'CST 336: Project 3',
	css: rsc.bootstrap + '<link rel="stylesheet" href="/stylesheets/project_specific/project3.css" type="text/css">',
	fonts: rsc.materialIcons + '\n' + rsc.robotoFonts,
	footer: '<footer class="bg-dark py-3"> <section> <div class="container"> <p class="text-white text-center small m-0"> CST 336 - Internet Programming<br>The content on this website is written by Isak Hauge<br>&copy;<span id="year"></span>. All rights reserved.</p> <script>window.onload=function(){document.getElementById("year").innerText = new Date().getFullYear().toString();}</script> </div> </section> </footer>',
};

projectRouter.get('/project3', function(req, res, next) {
	res.render('project3/index', project3);
});

module.exports = projectRouter;