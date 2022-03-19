/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	// await knex('orders').del()
	await knex('orders').insert([{ id: 1, ordered_by_user_id: 0, status: 'processing' }]);
};
