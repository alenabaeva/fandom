const { Location, Episode } = require("../models/models")
const ApiError = require("../error/ApiError")
const uuid = require("uuid")
const path = require("path")

class LocationController {
  async create(req, res, next) {
    try {
      let { episodeIds } = req.body
      const { location_name, description, facts } = req.body
      let img = req.files?.img
      let location
      if (img) {
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, "..", "static", fileName))
        location = await Location.create({
          location_name,
          description,
          facts,
          img: fileName,
        })
      } else {
        location = await Location.create({
          location_name,
          description,
          facts,
        })
      }
      if (episodeIds !== undefined) {
        episodeIds = JSON.parse(episodeIds)
        episodeIds.forEach(async (id) => {
          const episode = await Episode.findOne({ where: { id } })
          await location.addEpisode(episode)
        })
      }

      return res.json(location)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    let { se_number, limit, page } = req.query
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit
    let locations
    if (!se_number) {
      locations = await Location.findAndCountAll({
        limit,
        offset,
        include: Episode,
      })
    }

    if (se_number) {
      locations = await Location.findAndCountAll({
        where: { se_number },
        limit,
        offset,
        include: Episode,
      })
    }
    return res.json(locations)
  }

  async getOne(req, res) {
    const { id } = req.params
    const location = await Location.findOne({
      where: { id },
      include: Episode,
    })
    return res.json(location)
  }

  async Update(req, res) {
    try {
      let { episodeIds } = req.body
      const { id } = req.params
      let { location } = req.body
      let img
      if (req.files !== null) img = req.files.img
      let updatedLocation = await Location.findOne({
        where: { id },
        include: Episode,
      })
      updatedLocation.removeEpisodes(updatedLocation.episodies)
      location = JSON.parse(location)
      if (img != null) {
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, "..", "static", fileName))
        await Location.update({ ...location, img: fileName }, { where: { id } })
      } else {
        await Location.update({ ...location }, { where: { id } })
      }

      updatedLocation = await Location.findOne({
        where: { id },
        include: Episode,
      })
      if (episodeIds) {
        episodeIds = JSON.parse(episodeIds)
        episodeIds.forEach(async (id) => {
          const episode = await Episode.findOne({ where: { id } })
          await updatedLocation.addEpisode(episode)
        })
      }

      return res.json(updatedLocation)
    } catch (e) {
      console.log(e)
    }
  }

  async delete(req, res) {
    const { id } = req.params
    const location = await Location.destroy({
      where: { id },
    })
    return res.json(location)
  }
}

module.exports = new LocationController()
