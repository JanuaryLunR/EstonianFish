const uuid = require('uuid')
const path = require('path')
const { Product, ProductInfo } = require('../models')

const create = async (req, res) => {
    try {
        const { name, price, brandId, typeId, info } = req.body
        const { img } = req.files
        // TODO Implement google services for storage images
        let fileName = uuid.v4() + '.jpg'
        img.mv(path.resolve(__dirname, '..', 'static', fileName))

        const product = await Product.create({ name, price, brandId, typeId, img: fileName })

        if (info) {
            info = JSON.parse(info)
            info.forEach(i =>
                ProductInfo.create({
                    title: i.title,
                    description: i.description,
                    productId: product.id
                })
            )
        }

        return res.json(device)
    }
    catch (e) {
        // TODO Create error handler
        return e
    }
}


const getAll = async (req, res) => {
    // TO DO I know here I can improve this algorithm
    let { brandId, typeId, limit, page } = req.query
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit
    let products;

    if (!brandId && !typeId) {
        products = await Product.findAndCountAll({ limit, offset })
    }

    if (brandId && !typeId) {
        products = await Product.findAndCountAll({ where: { brandId }, limit, offset })
    }

    if (!brandId && typeId) {
        products = await Product.findAndCountAll({ where: { typeId }, limit, offset })
    }

    if (brandId && typeId) {
        products = await Product.findAndCountAll({ where: { typeId, brandId }, limit, offset })
    }
    return res.json(products)
}

const getById = async (req, res) => {
    const { id } = req.params
    const product = await Product.findOne(
        {
            where: { id },
            // TODO Fix this
            // include: [{ model: ProductInfo, as: 'info' }]
        }
    )
    return res.json(product)
}

module.exports = {
    create,
    getAll,
    getById,
}