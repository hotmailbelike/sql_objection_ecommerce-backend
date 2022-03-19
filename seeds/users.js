const bcrypt = require('bcryptjs');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('users').del();
	const salt = await bcrypt.genSalt(10);

	await knex('users').insert([
		{
			id: 1,
			name: 'john doe',
			email: 'john@gmail.com',
			isAdmin: false,
			password: await bcrypt.hash('user1234', salt),
			createdAt: new Date(),
		},
		{
			id: 2,
			name: 'jane smith',
			email: 'jane@gmail.com',
			isAdmin: false,
			password: await bcrypt.hash('user1234', salt),
			createdAt: new Date(),
		},
		{
			id: 3,
			name: 'olsi alaika',
			email: 'olsi@gmail.com',
			isAdmin: false,
			password: await bcrypt.hash('user1234', salt),
			createdAt: new Date(),
		},
		{
			id: 4,
			name: 'admin1',
			email: 'admin1@gmail.com',
			isAdmin: true,
			password: await bcrypt.hash('admin1234', salt),
			createdAt: new Date(),
		},
	]);
};
