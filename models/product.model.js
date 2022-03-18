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

	static get nameColumn() {
		return 'name';
	}
	static get typeColumn() {
		return 'type';
	}
	static get categoryColumn() {
		return 'category';
	}
	static get ratingColumn() {
		return 'rating';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['name'],
			properties: {
				id: { type: 'integer' },
				name: { type: 'string', minLength: 1, maxLength: 255 },
				type: { type: 'string' },
				category: { type: 'string' },
				rating: { type: 'number' },
				createdAt: { type: 'string' },
				updatedAt: { type: 'string' },
			},
		};
	}
}

module.exports = Order;