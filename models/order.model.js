const { Model } = require('objection');

class Order extends Model {
	static get tableName() {
		return 'orders';
	}

	$beforeInsert() {
		this.createdAt = new Date();
	}

	$beforeUpdate() {
		this.updatedAt = new Date();
	}

	static get statusColumn() {
		return 'status';
	}

	static get ordered_by_user_idColumn() {
		return 'ordered_by_user_id';
	}

	static get productsColumn() {
		return 'products';
	}

	static get totalBillColumn() {
		return 'totalBill';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['ordered_by_user_id'],
			properties: {
				id: { type: 'integer' },
				ordered_by_user_id: { type: 'integer' },
				status: {
					type: 'string',
					default: 'processing',
					enum: ['processing', 'en-route', 'delivered', 'cancelled'],
				},
				createdAt: { type: 'string' },
				updatedAt: { type: 'string' },
				totalBill: { type: 'number' },
				products: [
					{
						type: 'object',
						required: ['name', 'quantity'],
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
		const User = require('./user.model');
		return {
			ordered_by: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: 'orders.ordered_by_user_id',
					to: 'users.id',
				},
			},
		};
	}
}

module.exports = Order;
