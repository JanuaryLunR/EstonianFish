const Router = require('express')
const router = new Router()
const brand = require('./brand')
const product = require('./product')
const type = require('./type')
const user = require('./user')


router.use('/user', user)
router.use('/type', type)
router.use('/brand', brand)
router.use('/product', product)

module.exports = router