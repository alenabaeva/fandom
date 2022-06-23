const Router = require("express")
const router = new Router()
const episodeController = require("../controllers/episodeController")

router.post("/", episodeController.create)
router.get("/", episodeController.getAll)
router.get("/:id", episodeController.getOne)
router.put("/:id", episodeController.Update)
router.delete("/:id", episodeController.delete)

module.exports = router
