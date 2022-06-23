const { Relationship } = require("../models/models")
const ApiError = require("../error/ApiError")

class RelationshipController {
  async create(req, res) {
    try {
      const { relationship_kind } = req.body

      const relationship = await Relationship.create({ relationship_kind })

      console.log(relationship)
      return res.json(relationship)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    const relationships = await Relationship.findAll()
    return res.json(relationships)
  }

  async getOne(req, res) {
    const { id } = req.params
    const relationship = await Relationship.findOne({
      where: { id },
    })
    return res.json(relationship)
  }

  async Update(req, res) {
    const { id } = req.params
    const relationship = req.body
    await Relationship.update(relationship, { where: { id } })
    const updatedRelationship = await Relationship.findOne({
      where: { id },
    })
    return res.json(updatedRelationship)
  }

  async delete(req, res) {
    const { id } = req.params
    const relationship = await Relationship.destroy({
      where: { id },
      // force: false,
      // truncate: true
    })
    return res.json(relationship)
  }
}

module.exports = new RelationshipController()
