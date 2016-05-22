var Waterline = require('waterline')

module.exports = Waterline.Collection.extend({

	identity: 'item',
	tableName: 'item',
	connection: 'default',

	attributes: {
    id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
	price: {type: 'float', required: true},
	quantity: {type: 'integer', required: true},
	product: {type: 'string', required: true},
	owner: {
      model: 'order'
    }
  }
})
