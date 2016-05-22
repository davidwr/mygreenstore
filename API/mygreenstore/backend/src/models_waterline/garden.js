var Waterline = require('waterline')

module.exports = Waterline.Collection.extend({

	identity: 'garden',
	tableName: 'garden',
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
  	photo: {
  		type: 'string'
  	},
  	deliveryDays: {
  		type: 'integer'
  	},
		location: {
			type: "json",
			required: true,
			index: true
		},
		owner: {
      model: 'user'
    }
  }
})
