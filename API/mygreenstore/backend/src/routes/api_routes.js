var api = module.exports = require('express').Router()
var product = require('../controllers/product')
var order = require('../controllers/order')
var garden = require('../controllers/garden')
var profile = require('../controllers/profile')

var isAuthenticated = require('../policies/authentication')
var isSellerOrder = require('../policies/seller_order')
var isCustomerOrder = require('../policies/customer_order')
var isProductOwner = require('../policies/customer_product')

api.post('/product', isAuthenticated, product.insert)
api.put('/product/:id', isAuthenticated, isProductOwner, product.update)
api.delete('/product/:id', isAuthenticated, isProductOwner, product.destroy)
api.get('/product', isAuthenticated, product.findAll)
api.get('/product/:id', isAuthenticated, product.findById)

api.post('/order', isAuthenticated, order.insert)
api.get('/order',isAuthenticated, order.findAll)
api.get('/order/:id', isAuthenticated, isSellerOrder, order.findById)
api.put('/order/:id/status', isAuthenticated, isSellerOrder, order.updateStatus)

api.post('/garden', isAuthenticated, garden.insert)
api.get('/garden', garden.getNear)
api.get('/garden/:id', garden.getById)
api.get('/garden/:id/product', garden.getProducts)
api.put('/garden/:id', isAuthenticated, garden.update)

api.get('/mygarden', isAuthenticated, garden.findByUser)

api.post('/profile', isAuthenticated, profile.insert)
api.put('/profile/:id', isAuthenticated, profile.update)
api.get('/profile', isAuthenticated, profile.findByUser)
