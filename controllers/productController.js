const uuid = require('uuid')
const path = require('path');
const {Product, ProductInfo} = require('../models/models')
const ApiError = require('../error/ApiError');

class ProductController {
    async create(req, res, next) {
        try {
            let {name, price, genreId, marketplaceId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName ))
            const product = await Product.create({name, price, genreId, marketplaceId, img: fileName})
            
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

            
            
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async getAll(req, res) {
        let {genreId, marketplaceId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit // отступ (в 9 товаров)
        let products;
        if (!genreId && !marketplaceId) {
            products = await Product.findAndCountAll({limit, offset})
        }
        if (genreId && !marketplaceId) {
            products = await Product.findAndCountAll({where: {genreId}, limit, offset})
        }
        if (!genreId && marketplaceId) {
            products = await Product.findAndCountAll({where: {marketplaceId}, limit, offset})
        }
        if (genreId && marketplaceId) {
            products = await Product.findAndCountAll({where: {marketplaceId, genreId},  limit, offset})
        }
        return res.json(products)
    }

    async getOne(req, res) {
        const {id} = req.params // достаём из роутера /::id
        const product = await Product.findOne(
            {
                where: {id},
                include: [{model: ProductInfo, as: 'info'}]
            },
        )
        return res.json(product)
    }

    async addKeys(req, res, next) {
        try {
            const { productId, keys } = req.body;
            const keysToCreate = keys.map(key => ({ productId, key }));
            await ProductKeys.bulkCreate(keysToCreate);
            res.json({ message: 'Keys added successfully' });
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    
    
    async getKeys(req, res, next) {
        try {
            const { productId } = req.params;

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    
    async deleteKeys(req, res, next) {
        try {
            const { productId, keyId } = req.params;
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    
}



module.exports = new ProductController() // через точку просто обрщаться к функциям и их вызывать