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
			required: ['name', 'email'],
			properties: {
				id: { type: 'integer' },
				name: { type: 'string', minLength: 1, maxLength: 255 },
				email: { type: 'string' },
				password: { type: 'string' },
				isAdmin: { type: 'boolean', default: false },
				createdAt: { type: 'string' },
				updatedAt: { type: 'string' },
				cartItems: [
					{
						type: 'object',
						required: ['name', 'quantity'],
						properties: {
							name: { type: 'string' },
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
					from: 'users.id',
					to: 'orders.ordered_by_user_id',
				},
			},
		};
	}
}

module.exports = User;
