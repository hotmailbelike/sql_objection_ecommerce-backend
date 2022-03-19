/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	// await knex('order').del();
	await knex('order').insert([
		{ id: 1, name: 'asd', type: 'jkl', category: 'qwe', rating: 1 },
	]);
};
