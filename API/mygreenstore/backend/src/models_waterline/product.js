var Waterline = require('waterline')

module.exports = Waterline.Collection.extend({

  identity: 'product',
  tableName: 'product',
  connection: 'default',

  attributes: {
  	id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    description: {type: 'string', required: true, minLength: 2, maxLength: 1000},
    price: {type: 'float', required: true},
    stock: {type: 'integer', required: true},
    owner: {
      model: 'user'
    }
  }
})
