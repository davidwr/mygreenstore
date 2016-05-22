var Waterline = require('waterline')

module.exports = Waterline.Collection.extend({

	identity: 'order',
	tableName: 'order',
	connection: 'default',

	attributes: {
    id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
	seller: {
		model: 'user'
	},
	customer: {type: 'string', required: true},
	ship_type: {type: 'string', required: true},
	status: {type: 'string', required: true},
	items: {
      collection: 'item',
      via: 'owner'
	}
  }
})
