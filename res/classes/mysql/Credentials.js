class Credentials {
	constructor() {
		this._host = process.env.DB_HOST;
		this._user = process.env.DB_USER;
		this._pass = process.env.DB_PASS;
	}

	get host() {
		return this._host;
	}

	set host(value) {
		this._host = value;
		return this;
	}

	get user() {
		return this._user;
	}

	set user(value) {
		this._user = value;
		return this;
	}

	get pass() {
		return this._pass;
	}

	set pass(value) {
		this._pass = value;
		return this;
	}
}

module.exports = Credentials;