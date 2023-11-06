const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket } = require('../models')

const _generateJwt = (id, email) => {
    return jwt.sign(
        { id, email },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

const registration = async (req, res) => {
    const { email, password, role } = req.body
    //TODO Here I can improve validation
    if (!email || !password) {
        return //TODO Add custom errors
    }
    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
        return
    }

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ email, role, password: hashPassword })
    // const basket = await Basket.create({ userId: user.id })
    const token = _generateJwt(user.id, user.email)

    return res.json({ token })
}

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
        return
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
        return
    }
    const token = _generateJwt(user.id, user.email)
    return res.json(token)
}

const check = async (req, res, next) => {
    const token = _generateJwt(req.user.id, req.user.email)
    return res.json({token})
}

module.exports = {
    registration,
    login,
    check
}