const Router = require("express")
const router = new Router()
const characterController = require("../controllers/characterController")

router.post("/", characterController.create)
router.get("/", characterController.getAll)
router.get("/:id", characterController.getOne)
router.put("/:id", characterController.Update)
router.delete("/:id", characterController.delete)

module.exports = router
