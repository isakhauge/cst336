const express = require('express');
const router = express.Router();
const CDN = require('../../../../res/data/vendor/cdn');

router.get('/', (req, res, nex) => {
	res.render('pages/lab/lab9-quotes', {
		title: 'CST 336: Lab 9',
		css: [CDN.css.bootstrap],
	})
});

module.exports = router;