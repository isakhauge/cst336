const express = require('express');
const router = express.Router();
const mysql = require('../../../../res/class/mysql/MySQL');
const mysqlCredentials = require('../../../../res/class/mysql/MysqlCredentials');
const CDN = require('../../../../res/data/vendor/cdn');
require('dotenv').config();
const axios = require('axios');


router.get('/', (req,res,next) => {
	const config = {
		title: 'CST 336: Lab 10 - Author Admin',
		css: [CDN.css.bootstrap],
		js: [CDN.js.jquery, CDN.js.popper, CDN.js.bootstrap,]
	};
	req.session.errors = null;
	if (req.session && req.session.userId) {
		res.render('pages/lab/lab10/', config);
	}
	else {
		console.log(req.session);
		res.render('pages/lab/lab10/login', config);
	}
});

router.get('/logout', (req,res,next) => {
	delete req.session.userId;
	res.redirect('/lab/lab10');
});

router.post('/login', (req,res,next) => {
	const config = {
		title: 'CST 336: Lab 10 - Author Admin',
		css: [CDN.css.bootstrap],
		js: [CDN.js.jquery, CDN.js.popper, CDN.js.bootstrap,],
	};
	axios.post('https://isakhauge-cst336.herokuapp.com/api/lab9/login', req.body)
		.then((response) => {
			console.log(req.session);
			if (response.data.length > 0) {
				if (response.data[0]['ID']) {
					console.log('LOGIN SUCCESS!');
					console.log('User ID: ' + response.data[0]['ID']);
					req.session.userId = response.data[0]['ID'];

					res.redirect('/lab/lab10');
				} else res.redirect('/lab/lab10/login');
			} else {
				res.render('pages/lab/lab10/login', config);
			}
		})
		.catch((error) => {
			console.log(error);
			res.render('pages/lab/lab10/login', config);
		});
});

router.get('/admin', (req, res, next) => {
	const config = {
		title: 'CST 336: Lab 10 - Author Admin',
		css: [CDN.css.bootstrap],
		js: [CDN.js.jquery, CDN.js.popper, CDN.js.bootstrap,],
	};
	if (req.session && req.session.userId)
		res.render('pages/lab/lab10/', config);
	else res.render('pages/lab/lab10/login', config);
});

module.exports = router;