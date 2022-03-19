module.exports = {
	development: {
		client: 'mysql',
		useNullAsDefault: true,
		connection: {
			host: '127.0.0.1',
			user: 'root', // replace with your mysql username
			password: '', // replace with your mysql password
			database: 'basic-eCommerce', // replace with your db name
		},
		migrations: {
			directory: __dirname + '/db/migrations',
		},
		seeds: {
			directory: __dirname + '/seeds',
		},
		// pool: {
		// 	afterCreate: (conn, cb) => {
		// 		conn.run('PRAGMA foreign_keys = ON', cb);
		// 	},
		// },
	},
};
