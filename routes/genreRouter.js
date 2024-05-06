const Router = require('express')
const router = new Router()
const genreController = require('../controllers/genreController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), genreController.create) //все магазины создавать 
router.get('/', genreController.getAll) // все магазины получать
// router.delete('/', genreController.deleteAll)

module.exports = router

//genre = type