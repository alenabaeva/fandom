const Router = require("express")
const router = new Router()
const facultyController = require("../controllers/facultyController")

router.post("/", facultyController.create)
router.get("/", facultyController.getAll)
router.get("/:id", facultyController.getOne)
router.put("/:id", facultyController.Update)
router.delete("/:id", facultyController.delete)

module.exports = router
