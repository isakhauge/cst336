const mysql = require('mysql');
const Credentials = require('res/classes/mysql/Credentials');

class MySQL {

	// Static connection instance variable.
	static connection = null;

	// Constructor.
	constructor() {
		// Init. DB credentials object.
		this._credentials = new Credentials();

		const credentials = {
			host: this._credentials.host,
			user: this._credentials.user,
			password: this._credentials.pass
		};

		this._conn = mysql.createConnection(credentials);
	}

	// Singleton instance.
	static get connectionInstance() {
		if (!MySQL.connection)
			MySQL.connection = new MySQL();
		return MySQL.connection;
	}

	isConnected() {
		return this.conn.state !== 'disconnected';
	}

	query(sql, callback) {
		this.conn.connect((error) => {
			if (error) throw error;
			this.conn.query(sql, (error, result) => {
				if (error) throw error;
					callback(result);
			});
		});
	}

	get conn() {
		return this._conn;
	}

}

module.exports = MySQL;