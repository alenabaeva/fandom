const sequelize = require("../db")
const { DataTypes } = require("sequelize")

const Serial = sequelize.define("serial", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  serial_name: { type: DataTypes.STRING },
  description_series: { type: DataTypes.STRING },
  year_issue: { type: DataTypes.INTEGER },
  budget: { type: DataTypes.FLOAT },
  creator: { type: DataTypes.STRING },
  timing: { type: DataTypes.FLOAT },
  number_seasons: { type: DataTypes.INTEGER },
  country: { type: DataTypes.STRING },
  tagline: { type: DataTypes.STRING },
  screenwriter: { type: DataTypes.STRING },
  director: { type: DataTypes.STRING },
  producer: { type: DataTypes.STRING },
  composer: { type: DataTypes.STRING },
  artist: { type: DataTypes.STRING },
  animator: { type: DataTypes.STRING },
  premiere_russia: { type: DataTypes.DATE },
  premiere_world: { type: DataTypes.DATE },
  mpaa: { type: DataTypes.STRING },
  voice_actor: { type: DataTypes.STRING },
})

const Episode = sequelize.define("episode", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  season: { type: DataTypes.INTEGER },
  series_name: { type: DataTypes.STRING },
  se_number: { type: DataTypes.STRING },
  synopsis: { type: DataTypes.STRING },
  plot: { type: DataTypes.STRING },
  facts: { type: DataTypes.STRING },
  storyboard: { type: DataTypes.STRING },
  img: { type: DataTypes.STRING },
})

const Location = sequelize.define("location", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  location_name: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  facts: { type: DataTypes.STRING },
  img: { type: DataTypes.STRING },
})

const Character = sequelize.define("character", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  character_name: { type: DataTypes.STRING },
  occupation: { type: DataTypes.STRING },
  place_recidence: { type: DataTypes.STRING },
  genus: { type: DataTypes.STRING },
  kind: { type: DataTypes.STRING },
  age: { type: DataTypes.STRING },
  orientation: { type: DataTypes.STRING },
  capabilities: { type: DataTypes.STRING },
  goals: { type: DataTypes.STRING },
  compound: { type: DataTypes.STRING },
  voice_actor: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  appearance: { type: DataTypes.STRING },
  personality: { type: DataTypes.STRING },
  facts: { type: DataTypes.STRING },
  img: { type: DataTypes.STRING },
})

const Relationship = sequelize.define("relationship", {
  relationship_kind: { type: DataTypes.STRING },
})

const Kinship = sequelize.define("kinship", {
  kinship_kind: { type: DataTypes.STRING },
})

const Faculty = sequelize.define("faculty", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  faculty_name: { type: DataTypes.STRING },
  color: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  img: { type: DataTypes.STRING },
})

const EpisodeLocation = sequelize.define("location_episode", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const EpisodeCharacter = sequelize.define("character_episode", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

Serial.hasMany(Episode)
Episode.belongsTo(Serial)

Episode.belongsToMany(Location, { through: EpisodeLocation })
Location.belongsToMany(Episode, { through: EpisodeLocation })

Episode.belongsToMany(Character, { through: EpisodeCharacter })
Character.belongsToMany(Episode, { through: EpisodeCharacter })

//Character.hasOne(Character)
//Character.belongsTo(Character) //????

Faculty.hasMany(Character)
Character.belongsTo(Faculty)

module.exports = {
  Serial,
  Episode,
  Location,
  Character,
  Relationship,
  Kinship,
  Faculty,
  EpisodeLocation,
  EpisodeCharacter,
}
