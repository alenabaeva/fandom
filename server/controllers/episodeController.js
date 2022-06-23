const { Episode, Character, Location } = require("../models/models")
const ApiError = require("../error/ApiError")
const uuid = require("uuid")
const path = require("path")

class EpisodeController {
  async create(req, res, next) {
    try {
      let { characterIds, locationIds } = req.body
      const { season, series_name, se_number, synopsis, plot, facts } = req.body
      let img = req.files?.img
      let episode
      if (img) {
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, "..", "static", fileName))
        episode = await Episode.create({
          season,
          series_name,
          se_number,
          synopsis,
          plot,
          facts,

          img: fileName,
        })
      } else {
        episode = await Episode.create({
          season,
          series_name,
          se_number,
          synopsis,
          plot,
          facts,
        })
      }

      if (characterIds !== undefined) {
        characterIds = JSON.parse(characterIds)
        characterIds.forEach(async (id) => {
          const character = await Character.findOne({ where: { id } })
          await episode.addCharacter(character)
        })
      }

      if (locationIds !== undefined) {
        locationIds = JSON.parse(locationIds)
        locationIds.forEach(async (id) => {
          const location = await Location.findOne({ where: { id } })
          await episode.addLocation(location)
        })
      }

      return res.json(episode)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    try {
      const { sort } = req.query
      let { se_number, season, limit, page } = req.query
      page = page || 1
      limit = limit || 9
      let offset = page * limit - limit
      let episodes
      if (!season && !se_number) {
        episodes = await Episode.findAndCountAll({
          limit,
          offset,
          include: [Character, Location],
          order: [["se_number", "ASC"]],
        })
      }
      if (season && !se_number) {
        episodes = await Episode.findAndCountAll({
          where: { season },
          include: [Character, Location],
          order: [["se_number", "ASC"]],
          limit,
          offset,
        })
      }
      if (!season && se_number) {
        episodes = await Episode.findAndCountAll({
          where: { se_number },
          include: [Character, Location],
          order: [["se_number", "ASC"]],
          limit,
          offset,
        })
      }
      if (season && se_number) {
        episodes = await Episode.findAndCountAll({
          where: { se_number, season },
          include: [Character, Location],
          order: [["se_number", "ASC"]],
          limit,
          offset,
        })
      }
      return res.json(episodes)
    } catch (e) {
      console.log(e.message)
    }
  }
  async getOne(req, res) {
    const { id } = req.params
    const episode = await Episode.findOne({
      where: { id },
      include: [Character, Location],
    })
    return res.json(episode)
  }

  async Update(req, res) {
    try {
      let { characterIds, locationIds } = req.body
      const { id } = req.params
      let { episode } = req.body
      let img
      if (req.files !== null) img = req.files.img
      let updatedEpisode = await Episode.findOne({
        where: { id },
        include: [Character, Location],
      })
      updatedEpisode.removeCharacters(updatedEpisode.characters)
      updatedEpisode.removeLocations(updatedEpisode.locations)
      episode = JSON.parse(episode)
      if (img != null) {
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, "..", "static", fileName))
        await Episode.update({ ...episode, img: fileName }, { where: { id } })
      } else {
        await Episode.update({ ...episode }, { where: { id } })
      }
      updatedEpisode = await Episode.findOne({
        where: { id },
        include: [Character, Location],
      })
      if (characterIds) {
        characterIds = JSON.parse(characterIds)
        characterIds.forEach(async (id) => {
          const character = await Character.findOne({ where: { id } })
          await updatedEpisode.addCharacter(character)
        })
      }
      if (locationIds) {
        locationIds = JSON.parse(locationIds)
        locationIds.forEach(async (id) => {
          const location = await Location.findOne({ where: { id } })
          await updatedEpisode.addLocation(location)
        })
      }

      return res.json(updatedEpisode)
    } catch (e) {
      console.log(e)
    }
  }

  async delete(req, res) {
    const { id } = req.params
    const episode = await Episode.destroy({
      where: { id },
    })
    return res.json(episode)
  }
}

module.exports = new EpisodeController()
