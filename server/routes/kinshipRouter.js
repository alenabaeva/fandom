const Router = require("express")
const router = new Router()
const kinshipController = require("../controllers/kinshipController")

router.post("/", kinshipController.create)
router.get("/", kinshipController.getAll)
router.get("/:id", kinshipController.getOne)
router.put("/:id", kinshipController.Update)
router.delete("/:id", kinshipController.delete)

module.exports = router
