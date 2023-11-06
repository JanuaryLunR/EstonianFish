const Router = require('express')
const router = new Router()
const { 
    registration,
    login,
    check
} = require('../controllers/user')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/registration', registration)
router.post('/login', login)
router.get('/auth', authMiddleware, check)
// router.delete('/',)

module.exports = router