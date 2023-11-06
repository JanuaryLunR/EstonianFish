const Router = require('express')
const router = new Router()
const {
    create,
    getAll,
    getById,
} = require('../controllers/product')

router.post('/', create)
router.get('/', getAll)
router.get('/:id', getById)
router.delete('/',)

module.exports = router