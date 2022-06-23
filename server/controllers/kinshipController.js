const { Kinship } = require("../models/models")
const ApiError = require("../error/ApiError")

class KinshipController {
  async create(req, res) {
    try {
      const { kinship_kind } = req.body

      const kinship = await Kinship.create({ kinship_kind })

      console.log(kinship)
      return res.json(kinship)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    const kinships = await Kinship.findAll()
    return res.json(kinships)
  }

  async getOne(req, res) {
    const { id } = req.params
    const cinship = await Kinship.findOne({
      where: { id },
    })
    return res.json(cinship)
  }

  async Update(req, res) {
    const { id } = req.params
    const cinship = req.body
    await Kinship.update(cinship, { where: { id } })
    const updatedKinship = await Kinship.findOne({
      where: { id },
    })
    return res.json(updatedKinship)
  }

  async delete(req, res) {
    const { id } = req.params
    const cinship = await Kinship.destroy({
      where: { id },
      // force: false,
      // truncate: true
    })
    return res.json(cinship)
  }
}

module.exports = new KinshipController()
