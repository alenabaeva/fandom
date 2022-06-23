const Router = require("express")
const router = new Router()
const relationshipController = require("../controllers/relationshipController")

router.post("/", relationshipController.create)
router.get("/", relationshipController.getAll)
router.get("/:id", relationshipController.getOne)
router.put("/:id", relationshipController.Update)
router.delete("/:id", relationshipController.delete)

module.exports = router
