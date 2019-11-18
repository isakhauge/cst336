const CDN = require('../res/data/vendor/cdn');
const express = require('express');
const router = express.Router();
const labRouter = require('./routers/lab/index');
const exerciseRouter = require('./routers/exercise/index');
const midtermRouter = require('./routers/midterm/index');
const portfolioRouter = require('./routers/portfolio/index');
const projectRouter = require('./routers/project/index');
const apiRouter = require('./routers/api/apiRouter');


/* Landing page */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'CST 336',
    css: CDN.css
  });
});

// * Assign routers.
router.use('/lab', labRouter);
router.use('/midterm', midtermRouter);
router.use('/portfolio', portfolioRouter);
router.use('/exercise', exerciseRouter);
router.use('/project', projectRouter);
router.use('/api', apiRouter);

module.exports = router;