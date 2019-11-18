const CDN = require('../../../../res/data/vendor/cdn');
const express = require('express');
const routerLab8 = express.Router();
const f = require('../../../../res/backendFunctions');




// Config object.
const config = {
	title: 'Lab 8',
	css: {
		bootstrap: CDN.css.bootstrap,
	},
	font: {
		roboto: CDN.font.roboto,
	},
	question: {
		rushmorePresident: {
			jackson: {
				id: 'check-jackson',
				value: 'jackson',
				text: 'A. Jackson'
			},
			franklin: {
				id: 'check-franklin',
				value: 'franklin',
				text: 'B. Franklin'
			},
			jefferson: {
				id: 'check-jefferson',
				value: 'jefferson',
				text: 'T. Jefferson'
			},
			roosevelt: {
				id: 'check-roosevelt',
				value: 'roosevelt',
				text: 'T. Roosevelt'
			}
		}
	},
	answer: {
		captitalCalifornia: '',
		longestRiver: '',
		smallestState: '',
		rushmorePresidents: '',
		californiaSeal: '',
		yearColombusDiscoveredAmerica: '',
		largestState: '',
		secondPresident: ''
	},
	points: 0.0,
	trials: 0,
	scoreLog: '',
	congratulate: false,
};




// Points per question.
const SCORE_UNIT = 12.5;




// Correct answers.
const CORRECT_ANSWERS = {
	'capital-california': 'sacramento',
	'longest-river': 'mississippi',
	'smallest-state': 'rhode-island',
	'rushmore-presidents': ['jefferson', 'roosevelt'],
	'cali-seal': 'seal-2',
	'year-colombus-discovered-america': '1492',
	'largest-state': 'alaska',
	'second-president': 'adams'
};




// Evaluate answers.
function evaluateAnswers(answersObject, configObject) {

	// Total points:
	let totalPoints = 0.0;

	// Question 1: Capital of California.
	if (answersObject['capital-california'].toString().toLowerCase() === CORRECT_ANSWERS['capital-california']) {
		configObject.answer.captitalCalifornia = true; totalPoints += SCORE_UNIT;
	} else configObject.answer.captitalCalifornia = false;

	// Question 2: Longest River.
	if (answersObject['longest-river'].toString().toLowerCase() === CORRECT_ANSWERS['longest-river']) {
		configObject.answer.longestRiver = true; totalPoints += SCORE_UNIT;
	} else configObject.answer.longestRiver = false;

	// Question 3: Smallest State.
	if (answersObject['smallest-state'].toString().toLowerCase() === CORRECT_ANSWERS['smallest-state']) {
		configObject.answer.smallestState = true; totalPoints += SCORE_UNIT;
	} else configObject.answer.smallestState = false;

	// Question 4: Presidents Carved into Mount Rushmore.
	if (
		answersObject['rushmore-presidents'].includes(CORRECT_ANSWERS['rushmore-presidents'][0])
		&& answersObject['rushmore-presidents'].includes(CORRECT_ANSWERS['rushmore-presidents'][1])
	) {
		configObject.answer.rushmorePresidents = true; totalPoints += SCORE_UNIT;
	} else configObject.answer.rushmorePresidents = false;

	// Question 5: The Great Seal of The State of California.
	if (answersObject['cali-seal'].toString().toLowerCase() === CORRECT_ANSWERS['cali-seal']) {
		configObject.answer.californiaSeal = true; totalPoints += SCORE_UNIT;
	} else configObject.answer.californiaSeal = false;

	// Question 6: The year Cristopher Colombus Discovered America.
	if (answersObject['year-colombus-discovered-america'].toString().toLowerCase() === CORRECT_ANSWERS['year-colombus-discovered-america']) {
		configObject.answer.yearColombusDiscoveredAmerica = true; totalPoints += SCORE_UNIT;
	} else configObject.answer.yearColombusDiscoveredAmerica = false;

	// Question 7: Largest State.
	if (answersObject['largest-state'].toString().toLowerCase() === CORRECT_ANSWERS['largest-state']) {
		configObject.answer.largestState = true; totalPoints += SCORE_UNIT;
	} else configObject.answer.largestState = false;

	// Question 8: Second president of America.
	if (answersObject['second-president'].toString().toLowerCase() === CORRECT_ANSWERS['second-president']) {
		configObject.answer.secondPresident = true; totalPoints += SCORE_UNIT;
	} else configObject.answer.secondPresident = false;

	return totalPoints;
}




// Initialize score log cookie.
function initScoreLogCookie(req, res) {
	if (!req.cookies['scoreLog']) {
		const d = new Date();
		res.cookie('scoreLog', '', {maxAge: d.getTime() + 30*60*1000});
	}
}




// Shuffle
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}




// Regular router.
routerLab8.get('/', function (req, res, next) {
	initScoreLogCookie(req, res);
	config.question.rushmorePresident = shuffle(Object.values(config.question.rushmorePresident));

	const scoreLog = (req.cookies['scoreLog']) ? req.cookies['scoreLog'] : '';
	config.trials = scoreLog.split(',').length - 1;
	config.scoreLog = req.cookies['scoreLog'];

	res.render('pages/lab/lab8/index', config);
});




// Post router.
routerLab8.post('/', function (req, res, next) {
	const points = evaluateAnswers(req.body, config);
	config.points = points;

	initScoreLogCookie(req, res);
	const oldLog = req.cookies['scoreLog'];
	const scoreLog = (oldLog) ? req.cookies['scoreLog'] + points + ',' : points + ',';
	res.cookie('scoreLog', scoreLog);

	config.trials = scoreLog.split(',').length - 1;
	config.scoreLog = req.cookies['scoreLog'];
	config.congratulate = points > 80;

	res.render('pages/lab/lab8/index', config);
});


module.exports = routerLab8;