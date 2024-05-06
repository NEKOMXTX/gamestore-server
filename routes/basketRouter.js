const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

// ------- CRUD корзины ------- //
router.post('/', basketController.addToBasket)
router.get('/', basketController.getBasketUser)


module.exports = router