const Router = require("express")
const router = new Router()
const locationController = require("../controllers/locationController")

router.post("/", locationController.create)
router.get("/", locationController.getAll)
router.get("/:id", locationController.getOne)
router.put("/:id", locationController.Update)
router.delete("/:id", locationController.delete)

module.exports = router
