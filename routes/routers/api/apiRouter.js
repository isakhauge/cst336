const express = require('express');
const router = express.Router();
const lab9Router = require('./lab9/index');

// * Assign routers.
router.use('/lab9', lab9Router);

module.exports = router;