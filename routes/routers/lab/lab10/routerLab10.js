const express = require('express');
const session = require('express-session');
const router = express.Router();
const mysql = require('../../../../res/class/mysql/MySQL');
const mysqlCredentials = require('../../../../res/class/mysql/MysqlCredentials');
const CDN = require('../../../../res/data/vendor/cdn');
require('dotenv').config();
const axios = require('axios');

const SESSION_LIFETIME = 1000 * 60 * 60 * 2;
const app = express();
app.use(session({
	name: 'sid',
	resave: false,
	secret: '.Ø?#$11_*^2',
	cookie: {
		maxAge: SESSION_LIFETIME,
		sameSite: true,
		secure: true
	}
}));

router.get('/', (req,res,next) => {
	const config = {
		title: 'CST 336: Lab 10 - Author Admin',
		css: [CDN.css.bootstrap],
		js: [
			CDN.js.jquery,
			CDN.js.popper,
			CDN.js.bootstrap,
		],
	};
	res.render('pages/lab/lab10/login', config);
});

router.post('/admin', (req, res, next) => {
	const config = {
		title: 'CST 336: Lab 10 - Author Admin',
		css: [CDN.css.bootstrap],
		js: [
			CDN.js.jquery,
			CDN.js.popper,
			CDN.js.bootstrap,
		],
	};
	const requestBody = {
		email: req.body.email,
		password: req.body.password
	};
	axios.post('https://isakhauge-cst336.herokuapp.com/api/lab9/login', requestBody)
	.then((response) => {
		console.log(response.data);
		if (response.data[0]['ID']) {
			res.render('pages/lab/lab10', config);
		} else {
			res.render('pages/lab/lab10/login', config);
		}
	})
	.catch((error) => {
		console.log(error);
		res.render('pages/lab/lab10/login', config);
	});
});

module.exports = router;