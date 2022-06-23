const { Character, Episode, Faculty } = require("../models/models")
const ApiError = require("../error/ApiError")
const uuid = require("uuid")
const path = require("path")

class CharacterController {
  async create(req, res, next) {
    try {
      let { episodeIds, facultyId } = req.body
      const {
        character_name,
        occupation,
        place_recidence,
        genus,
        kind,
        age,
        orientation,
        capabilities,
        goals,
        compound,
        voice_actor,
        description,
        appearance,
        personality,
        facts,
      } = req.body
      let img = req.files?.img
      let character
      if (img) {
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, "..", "static", fileName))
        character = await Character.create({
          character_name,
          occupation,
          place_recidence,
          genus,
          kind,
          age,
          orientation,
          capabilities,
          goals,
          compound,
          voice_actor,
          description,
          appearance,
          personality,
          facts,
          img: fileName,
        })
      } else {
        character = await Character.create({
          character_name,
          occupation,
          place_recidence,
          genus,
          kind,
          age,
          orientation,
          capabilities,
          goals,
          compound,
          voice_actor,
          description,
          appearance,
          personality,
          facts,
        })
      }
      if (facultyId !== undefined) {
        const faculty = await Faculty.findOne({ where: { id: facultyId } })
        await character.addFaculty(faculty)
      }

      if (episodeIds !== undefined) {
        episodeIds = JSON.parse(episodeIds)
        episodeIds.forEach(async (id) => {
          const episode = await Episode.findOne({ where: { id } })
          await character.addEpisode(episode)
        })
      }

      return res.json(character)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    let {
      character_name,
      occupation,
      genus,
      kind,
      facultyId,
      episodeId,
      limit,
      page,
    } = req.query
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit
    let characters
    if (
      !character_name &&
      !occupation &&
      !genus &&
      !kind &&
      !facultyId &&
      !episodeId
    ) {
      characters = await Character.findAndCountAll({
        limit,
        offset,
        include: [Episode, Faculty],
      })
    }
    if (character_name) {
      characters = await Character.findAndCountAll({
        where: { character_name },
        limit,
        offset,
        include: [Episode, Faculty],
      })
    }
    if (occupation) {
      characters = await Character.findAndCountAll({
        where: { occupation },
        limit,
        offset,
        include: [Episode, Faculty],
      })
    }
    if (genus) {
      characters = await Character.findAndCountAll({
        where: { genus },
        limit,
        offset,
        include: [Episode, Faculty],
      })
    }
    if (kind) {
      characters = await Character.findAndCountAll({
        where: { kind },
        limit,
        offset,
        include: [Episode, Faculty],
      })
    }
    if (facultyId) {
      characters = await Character.findAndCountAll({
        where: { facultyId },
        limit,
        offset,
        include: [Episode, Faculty],
      })
    }
    if (episodeId) {
      characters = await Character.findAndCountAll({
        where: { episodeId },
        limit,
        offset,
        include: [Episode, Faculty],
      })
    }
    if (
      character_name &&
      occupation &&
      genus &&
      kind &&
      facultyId &&
      episodeId
    ) {
      characters = await Character.findAndCountAll({
        where: {
          character_name,
          occupation,
          genus,
          kind,
          facultyId,
          episodeId,
          include: [Episode, Faculty],
        },
        limit,
        offset,
      })
    }
    return res.json(characters)
  }

  async getOne(req, res) {
    const { id } = req.params
    const character = await Character.findOne({
      where: { id },
      include: [Episode, Faculty],
    })
    return res.json(character)
  }

  async Update(req, res) {
    try {
      let { episodeIds, facultyId } = req.body
      facultyId = Number(facultyId)
      const { id } = req.params
      let { character } = req.body
      let img
      if (req.files !== null) img = req.files.img //.file ?
      let updatedCharacter = await Character.findOne({
        where: { id },
        include: [Episode, Faculty],
      })
      updatedCharacter.removeEpisodes(updatedCharacter.episodes)
      character = JSON.parse(character)
      if (img != null) {
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, "..", "static", fileName))
        await Character.update(
          { ...character, img: fileName },
          { where: { id } }
        )
      } else {
        await Character.update({ ...character }, { where: { id } })
      }
      updatedCharacter = await Character.findOne({
        where: { id },
        include: [Episode, Faculty],
      })
      if (episodeIds) {
        episodeIds = JSON.parse(episodeIds)
        episodeIds.forEach(async (id) => {
          const episode = await Episode.findOne({ where: { id } })
          await updatedCharacter.addEpisode(episode)
        })
      }
      let faculty = null
      if (facultyId)
        faculty = await Faculty.findOne({ where: { id: facultyId } })
      await updatedCharacter.setFaculty(faculty)
      return res.json(updatedCharacter)
    } catch (e) {
      return res.json(e.message)
    }
  }

  async delete(req, res) {
    const { id } = req.params
    const character = await Character.destroy({
      where: { id },
    })
    return res.json(character)
  }
}

module.exports = new CharacterController()
