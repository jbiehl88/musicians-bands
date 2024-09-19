const { Band } = require("./models/Band")
const { Musician } = require("./models/Musician")
const { Song } = require("./models/Song")
const { Manager } = require("./models/Manager")
// Define associations here

Band.hasMany(Musician)
Musician.belongsTo(Band)

Song.belongsToMany(Band, { through: "BandSongs" })
Band.belongsToMany(Song, { through: "BandSongs" })

Manager.hasOne(Band)
Band.belongsTo(Manager)

module.exports = {
	Band,
	Musician,
	Song,
	Manager,
}
