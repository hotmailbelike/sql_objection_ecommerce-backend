/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	// await knex('users').del();
	await knex('users').insert([
		{ id: 1, name: 'john doe', email: 'john@gmail.com', isAdmin: false },
		{ id: 2, name: 'jane smith', email: 'jane@gmail.com', isAdmin: false },
		{ id: 3, name: 'olsi alaika', email: 'olsi@gmail.com', isAdmin: false },
		{ id: 4, name: 'admin1', email: 'admin1@gmail.com', isAdmin: true },
	]);
};
