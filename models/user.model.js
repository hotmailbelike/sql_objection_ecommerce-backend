const { Model } = require('objection');

class User extends Model {
	static get tableName() {
		return 'users';
	}

	$beforeInsert() {
		this.createdAt = new Date();
	}

	$beforeUpdate() {
		this.updatedAt = new Date();
	}

	static get nameColumn() {
		return 'name';
	}

	static get emailColumn() {
		return 'email';
	}

	static get isAdminColumn() {
		return 'isAdmin';
	}

	static get cartItemsColumn() {
		return 'cartItems';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['name', 'email', 'password'],
			properties: {
				id: { type: 'integer' },
				name: { type: 'string', minLength: 1, maxLength: 255 },
				email: { type: 'string' },
				password: { type: 'string' },
				isAdmin: { type: 'boolean', default: false },
				createdAt: { type: 'string' },
				updatedAt: { type: 'string' },
				order_ids: [{ type: 'integer' }],
				// need to figure out how to ref to an array of product ids
				cartItems: [
					{
						type: 'object',
						required: ['name', 'price', 'quantity'],
						properties: {
							name: { type: 'string' },
							price: { type: 'number' },
							quantity: { type: 'number', default: 0 },
						},
					},
				],
			},
		};
	}

	static get relationMappings() {
		const Order = require('./order');

		return {
			orders: {
				relation: Model.HasManyRelation,
				modelClass: Order,
				join: {
					from: 'users.order_ids',
					to: 'orders.id',
				},
			},
		};
	}
}

module.exports = User;
