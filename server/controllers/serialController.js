const { Episode, Character, Faculty, Location } = require("../models/models")
const ApiError = require("../error/ApiError")
const Sequlize = require("sequelize")

class SerialController {
  async create(req, res, next) {
    try {
      const {
        serial_name,
        description_series,
        year_issue,
        budget,
        creator,
        timing,
        number_seasons,
        country,
        tagline,
        screenwriter,
        director,
        producer,
        composer,
        artist,
        animator,
        premiere_russia,
        premiere_world,
        mpaa,
        voice_actor,
      } = req.body

      const Serial = await Serial.create({
        serial_name,
        description_series,
        year_issue,
        budget,
        creator,
        timing,
        number_seasons,
        country,
        tagline,
        screenwriter,
        director,
        producer,
        composer,
        artist,
        animator,
        premiere_russia,
        premiere_world,
        mpaa,
        voice_actor,
      })

      console.log(serial)
      return res.json(serial)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    let { serial_name, year_issue, limit, page } = req.query
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit
    let serials
    if (!serial_name && !year_issue) {
      serials = await Serial.findAndCountAll({ limit, offset })
    }
    if (serial_name && !year_issue) {
      serials = await Serial.findAndCountAll({
        where: { serial_name },
        limit,
        offset,
      })
    }
    if (!serial_name && year_issue) {
      serials = await Serial.findAndCountAll({
        where: { year_issue },
        limit,
        offset,
      })
    }
    if (serial_name && year_issue) {
      serials = await Serial.findAndCountAll({
        where: { year_issue, serial_name },
        limit,
        offset,
      })
    }
    return res.json(serials)
  }

  async getOne(req, res) {
    // const {id} = req.params
    // const device = await Device.findOne(
    //     {
    //         where: {id},
    //         include: [{model: DeviceInfo, as: 'info'}]
    //     },
    // )
    // return res.json(serial)
  }

  async search(req, res) {
    try {
      const searchName = req.query.search
      // Берем из БД все данные
      // Ищем по ним

      // затычка

      const episodes = await Episode.findAll({
        where: {
          [Sequlize.Op.or]: [
            { series_name: { [Sequlize.Op.like]: "%" + searchName + "%" } },
            { se_number: { [Sequlize.Op.like]: "%" + searchName + "%" } },
          ],
        },
      })

      const locations = await Location.findAll({
        where: {
          location_name: { [Sequlize.Op.like]: "%" + searchName + "%" },
        },
      })

      const characters = await Character.findAll({
        where: {
          character_name: { [Sequlize.Op.like]: "%" + searchName + "%" },
        },
      })

      const faculties = await Faculty.findAll({
        where: {
          [Sequlize.Op.or]: [
            { faculty_name: { [Sequlize.Op.like]: "%" + searchName + "%" } },
            { color: { [Sequlize.Op.like]: "%" + searchName + "%" } },
          ],
        },
      })

      const result = {
        episodes,
        locations,
        characters,
        faculties,
      }
      return res.json(result)
    } catch (e) {
      return res.json(e.message)
    }
  }
}

module.exports = new SerialController()
