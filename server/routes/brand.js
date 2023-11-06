const Router = require('express')
const router = new Router()
const { 
    create,
    getAll, 
} = require('../controllers/brand')

router.post('/', create)
router.get('/', getAll)
router.delete('/',)

module.exports = router