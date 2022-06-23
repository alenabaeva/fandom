const { Faculty, Character } = require("../models/models")
const ApiError = require("../error/ApiError")
const uuid = require("uuid")
const path = require("path")

class FacultyController {
  async create(req, res, next) {
    try {
      let { characterIds } = req.body
      const { faculty_name, color, description } = req.body
      let img = req.files?.img
      let faculty
      if (img) {
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, "..", "static", fileName))
        faculty = await Faculty.create({
          faculty_name,
          color,
          description,
          img: fileName,
        })
      } else {
        faculty = await Faculty.create({
          faculty_name,
          color,
          description,
        })
      }

      if (characterIds !== undefined) {
        characterIds = JSON.parse(characterIds)
        characterIds.forEach(async (id) => {
          const character = await Character.findOne({ where: { id } })
          await faculty.addCharacter(character)
        })
      }

      return res.json(faculty)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    let { faculty_name, limit, page } = req.query
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit
    let faculties
    if (!faculty_name) {
      faculties = await Faculty.findAndCountAll({
        limit,
        offset,
        include: Character,
      })
    }
    if (faculty_name) {
      faculties = await Faculty.findAndCountAll({
        where: { faculty_name },
        include: Character,
        limit,
        offset,
      })
    }
    return res.json(faculties)
  }

  async getOne(req, res) {
    const { id } = req.params
    const faculty = await Faculty.findOne({
      where: { id },
      include: Character,
    })
    return res.json(faculty)
  }

  async Update(req, res) {
    try {
      let { characterIds } = req.body
      const { id } = req.params
      let { faculty } = req.body
      let img
      if (req.files !== null) img = req.files.img
      let updatedFaculty = await Faculty.findOne({
        where: { id },
        include: Character,
      })
      updatedFaculty.removeCharacters(updatedFaculty.characters)
      faculty = JSON.parse(faculty)
      if (img != null) {
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, "..", "static", fileName))
        await Faculty.update({ ...faculty, img: fileName }, { where: { id } })
      } else {
        await Faculty.update({ ...faculty }, { where: { id } })
      }

      updatedFaculty = await Faculty.findOne({
        where: { id },
        include: Character,
      })
      if (characterIds) {
        characterIds = JSON.parse(characterIds)
        characterIds.forEach(async (id) => {
          const character = await Character.findOne({ where: { id } })
          await updatedFaculty.addCharacter(character)
        })
      }
      return res.json(updatedFaculty)
    } catch (e) {
      console.log(e)
    }
  }

  async delete(req, res) {
    const { id } = req.params
    const faculty = await Faculty.destroy({
      where: { id },
    })
    return res.json(faculty)
  }
}

module.exports = new FacultyController()
