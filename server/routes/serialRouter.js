const Router = require('express')
const router = new Router()
const serialController = require('../controllers/serialController')

router.post('/', serialController.create)
router.get('/', serialController.getAll)
router.get('/:id', serialController.getOne)


module.exports = router