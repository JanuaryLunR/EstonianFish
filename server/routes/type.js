const Router = require('express')
const router = new Router()
const { 
    create,
    getAll, 
} = require('../controllers/type')


router.post('/', create)
router.get('/', getAll)
router.delete('/',)

module.exports = router