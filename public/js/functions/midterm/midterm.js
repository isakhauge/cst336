import * as f from './functions.js';

const VIDEO_ID = 'DyX-QZZBgpw';
const BASE_URL = 'https://cst336.herokuapp.com/projects/api/videoLikesAPI.php?';
function generateURL(id, action=null) {
	if (action)
		return BASE_URL + 'videoId=' + id + '&action=' + action;
	else return BASE_URL + 'videoId=' + id;
}
const Actions = {
	LIKE: 'like',
	CANCEL_LIKE: 'cancel_like',
	DISLIKE: 'dislike',
	CANCEL_DISLIKE: 'cancel_dislike',
	SEE_COMMENTS: 'comments',
};
const VIDEO_STATS = null;

function generateStar() {
	const elem = f.make('img');
	elem.src = '/images/midterm/star.jpg';
	elem.width = '24';
	return elem.outerHTML;
}

function generateStars(n) {
	let out = '';
	for (let i=0; i<n; i++)
		out += generateStar().toString();
	return out.toString();
}

function generateComment(name, date, comment, starNum) {
	return `
		<div class="rounded border bg-light p-2 mb-3">
			<p>
				<span class="font-weight-bold mr-1">
					${name}
				</span>
				${date}</p>
			<p>${comment}</p>
			<div>
				${generateStars(starNum)}
			</div>
		</div>
	`;
}

function onload() {
	// Check that the script is loaded.
	f.debug('Midterm', 'JS Loaded', 'success');

	// TODO: Get all relevant elements.
	const btn_seeComments = f.get('#see-comments');
	const btn_answerQuestion = f.get('#answer-question');
	const btn_like = f.get('#like');
	const btn_cancel_like = f.get('#cancel-like');
	const div_likeNum = f.get('#like-num');
	const btn_dislike = f.get('#dislike');
	const btn_cancel_dislike = f.get('#cancel-dislike');
	const div_dislikeNum = f.get("#dislike-num");
	const div_comments = f.get('#comments');
	const select_question = f.get('#question');
	const div_status = f.get('#status');

	// TODO: Function for sending an API request:
	function sendApiRequest(callback, action=null) {
		const url = generateURL(VIDEO_ID, action);
		f.ajaxFetch('', url, function(raw) {
			if (f.isJSON(raw)) {
				const obj = JSON.parse(raw);
				callback(obj);
			}
		});
	}

	function flushComments() {
		while (div_comments.hasChildNodes())
			div_comments.firstChild.remove();
	}

	// TODO: Function for populating the comments.
	function populateComments(jsonObj) {
		flushComments();
		jsonObj.forEach(comment => {
			div_comments.innerHTML += generateComment(
				comment.author,
				comment.date,
				comment.comment,
				comment.rating
			)
		});
	}

	// TODO: Function for initial loading of video stats:
	function updateVideoStats(jsonObj) {
		div_likeNum.innerText = jsonObj.likes;
		div_dislikeNum.innerText = jsonObj.dislikes;
	}

	// TODO: OnClick EV for liking the video.
	const evLike = {
		type: 'click',
		listener: function(e) {
			const self = e.target;
			sendApiRequest(function(jsonObj) {
				updateVideoStats(jsonObj);
				f.debug('Action', 'Like', 'warning');
			}, Actions.LIKE);
		}
	};

	// TODO: OnClick EV for cancelling liking the video.
	const evCancelLike = {
		type: 'click',
		listener: function(e) {
			const self = e.target;
			sendApiRequest(function(jsonObj) {
				updateVideoStats(jsonObj);
				f.debug('Action', 'Cancel like', 'warning');
			}, Actions.CANCEL_LIKE);
		}
	};

	// TODO: OnClick EV for cancelling liking the video.
	const evDislike = {
		type: 'click',
		listener: function(e) {
			const self = e.target;
			sendApiRequest(function(jsonObj) {
				updateVideoStats(jsonObj);
				f.debug('Action', 'Dislike', 'warning');
			}, Actions.DISLIKE);
		}
	};

	// TODO: OnClick EV for cancelling liking the video.
	const evCancelDislike = {
		type: 'click',
		listener: function(e) {
			const self = e.target;
			sendApiRequest(function(jsonObj) {
				updateVideoStats(jsonObj);
				f.debug('Action', 'Cancel dislike', 'warning');
			}, Actions.CANCEL_DISLIKE);
		}
	};

	// TODO: OnClick EV for viewing the comments.
	const evViewComments = {
		type: 'click',
		listener: function(e) {
			const self = e.target;
			sendApiRequest(function(jsonObj) {
				populateComments(jsonObj);
				f.debug('Action', 'View comments', 'warning');
			}, Actions.SEE_COMMENTS);
		}
	};

	// TODO: OnClick EV for viewing the comments.
	const evSelectionChanged = {
		type: 'change',
		listener: function(e) {
			const self = e.target;
			const value = self.value;
			div_status.hidden = false;
			if (value === 'tech') {
				div_status.setAttribute('class', 'alert alert-success');
				div_status.innerText = 'Correct answer!';
			} else {
				div_status.setAttribute('class', 'alert alert-danger');
				div_status.innerText = 'Incorrect answer!';
			}
		}
	};

	// TODO: Initial update of video stats.
	sendApiRequest(function(jsonObj) {
		f.cout(JSON.stringify(jsonObj));
		updateVideoStats(jsonObj, null);
	});

	//

	// TODO: Add event listeners.
	btn_like.addEventListener(evLike.type, evLike.listener);
	btn_cancel_like.addEventListener(evCancelLike.type, evCancelLike.listener);
	btn_dislike.addEventListener(evDislike.type, evDislike.listener);
	btn_cancel_dislike.addEventListener(evCancelDislike.type, evCancelDislike.listener);
	btn_seeComments.addEventListener(evViewComments.type, evViewComments.listener);
	select_question.addEventListener(evSelectionChanged.type, evSelectionChanged.listener);
}
window.addEventListener('load', onload);