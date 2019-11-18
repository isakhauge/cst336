const express = require('express');
const router = express.Router();
const MySQL = require('../../../../res/class/mysql/MySQL');
const MysqlCredentials = require('../../../../res/class/mysql/MysqlCredentials');
const login = new MysqlCredentials(
	process.env.ANDERS_DB_HOST,
	process.env.ANDERS_DB_USER,
	process.env.ANDERS_DB_PASS,
	process.env.ANDERS_DB_NAME
);
const db = MySQL.getInstance(login);


router.get('/', (req, res, next) => {
	res.json('I am legend!');
});

router.post('/quote', (req, res, next) => {
	let sql = '';
	sql += `SET @author="${req.body.author}"; `;
	sql += `SET @quote="${req.body.quote}"; `;
	sql += `SET @sex="${req.body.sex}"; `;
	sql += `SET @category="${req.body.category}"; `;
	sql += `CALL quote_query2(@sex,@quote,@author,@category);`;
	db.query(sql)
		.then((resolved) => {
			res.json(resolved[4]);
		});
});

router.post('/author', (req, res, next) => {
	const sql = 'SELECT * FROM l9_author AS A WHERE CONCAT(A.`firstName`, " ", A.`lastName`) LIKE CONCAT("%", ?, "%")';
	db.prep(sql, [req.body.name])
	.then(result => {
		res.json(result);
	});
});

router.get('/category', (req, res, next) => {
	const sql = 'SELECT DISTINCT(category) FROM `l9_quotes`;';
	db.query(sql)
	.then(resolved => {
		res.json(resolved);
	})
});

module.exports = router;