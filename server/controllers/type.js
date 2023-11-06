const { Type } = require('../models')

const create = async (req, res) => {
    const { name } = req.body
    const type = await Type.create({ name })
    return res.json(type)
}

const getAll = async (req, res) => {
    const types = await Type.findAll()
    return res.json(types)
}

module.exports = {
    create,
    getAll,
}