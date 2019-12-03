const express = require('express');
const router = express.Router();
const mysql = require('../../../../res/class/mysql/MySQL');
const mysqlCredentials = require('../../../../res/class/mysql/MysqlCredentials');
require('dotenv').config();
const login = new mysqlCredentials(
	process.env.ANDERS_DB_HOST,
	process.env.ANDERS_DB_USER,
	process.env.ANDERS_DB_PASS,
	process.env.ANDERS_DB_NAME
);
const db = mysql.getInstance(login);


router.get('/', (req, res, next) => {
	res.json('I am legend!');
});

router.get('/author', (req,res,next) => {
	const sql = 'SELECT * FROM `l9_author`;';
	db.query(sql).then((resolved) => {
		res.json(resolved);
	}).catch((err) => {
		res.json(err);
	})
});

router.get('/author/:id', (req,res,next) => {
	const sql = 'SELECT * FROM `l9_author` WHERE `authorId` = ?;';
	db.prep(sql, [req.params.id]).then((resolved) => {
		res.json(resolved);
	}).catch((err) => {
		res.json(err);
	})
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

router.delete('/author/:id', (req,res,next) => {
	const sql = 'DELETE FROM `l9_author` WHERE `authorId` = ?;';
	console.log('SQL: ' + sql);
	db.prep(sql, [req.params.id]).then((resolved) => {
		res.json(resolved);
	}).catch((err) => {
		res.json(err);
	});
});

router.post('/author/new', (req,res,next) => {
	const requestBody = {
		fname: req.body.fname,
		lname: req.body.lname,
		dob: req.body.dob,
		dod: req.body.dod,
		sex: req.body.sex,
		profession: req.body.profession,
		country: req.body.country,
		portrait: req.body.portrait,
		biography: req.body.biography
	};
	console.log(requestBody);
	let sql = 'INSERT INTO `l9_author`';
	sql += ' (`firstName`,`lastName`,`dob`,`dod`,`sex`,`profession`,`country`,`portrait`,`biography`)';
	sql += ' VALUES(?,?,?,?,?,?,?,?,?)';
	db.prep(sql, Object.values(requestBody)).then((resolved) => {
		res.json(resolved);
	}).catch((err) => {
		res.json(err);
	});
});

router.put('/author', (req,res,next) => {
	const requestBody = {
		fname: req.body.fname,
		lname: req.body.lname,
		dob: req.body.dob,
		dod: req.body.dod,
		sex: req.body.sex,
		id: req.body.id
	};
	let sql = 'UPDATE `l9_author` SET';
	sql += ' `firstName` = ?,';
	sql += ' `lastName` = ?,';
	sql += ' `dob` = ?,';
	sql += ' `dod` = ?,';
	sql += ' `sex` = ?,';
	sql += ' `profession` = "UNDEFINED",';
	sql += ' `country` = "UNDEFINED",';
	sql += ' `portrait` = "UNDEFINED",';
	sql += ' `biography` = "UNDEFINED"';
	sql += ' WHERE `authorId` = ?;';
	db.prep(sql, Object.values(requestBody)).then((resolved) => {
		res.json(resolved);
	}).catch((err) => {
		res.json(err);
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

router.post('/login', (req,res,next) => {
	const requestBody = {
		email: req.body.email,
		password: req.body.password,
	};
	const sql = 'SELECT `ID` FROM `Admin` WHERE `email` = ? AND `password` = ?;';
	db.prep(sql, Object.values(requestBody)).then((resolved) => {
		res.json(resolved);
	}).catch((error) => {
		res.json(error);
	});
});

module.exports = router;