var Waterline = require('waterline')

module.exports = Waterline.Collection.extend({

	identity: 'user',
	tableName: 'user',
	connection: 'default',

	attributes: {
    id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
		name: {
			type: 'string',
			required: true
		},
		email: {
			type: 'string',
			required: true,
			unique: true
		},
		orders: {
	      collection: 'order',
	      via: 'seller'
		},
		products: {
	      collection: 'product',
	      via: 'owner'
		},
		token: {
			type: 'string',
			required: true
		}
  }
})
