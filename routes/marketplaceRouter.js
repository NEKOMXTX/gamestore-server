const Router = require('express')
const router = new Router()
const marketplaceController = require('../controllers/marketplaceController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), marketplaceController.create) //все магазины создавать 
router.get('/', marketplaceController.getAll) // все магазины получать
// router.delete('/', marketplaceController.delete)

module.exports = router

//marketplace = brand