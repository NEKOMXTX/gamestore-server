const {Marketplace} = require('../models/models')
const ApiError = require('../error/ApiError');

class MarketplaceController {
    async create(req, res) {
        const {name} = req.body
        const marketplace = await Marketplace.create({name})
        return res.json(marketplace)       
    }

    async getAll(req, res) {
        const marketplaces = await Marketplace.findAll()
        return res.json(marketplaces)
    }
}

module.exports = new MarketplaceController() // через точку просто обрщаться к функциям и их вызывать