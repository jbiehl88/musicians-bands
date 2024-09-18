const { db } = require("./db")
const { Band, Musician, Song } = require("./index")

describe("Band, Musician, and Song Models", () => {
	/**
	 * Runs the code prior to all tests
	 */
	beforeAll(async () => {
		// the 'sync' method will create tables based on the model class
		// by setting 'force:true' the tables are recreated each time the
		// test suite is run
		await db.sync({ force: true })
	})

	afterAll(async () => {
		await db.sync({ force: true })
	})

	test("can create a Band", async () => {
		let band = await Band.create({ name: "Smash Mouth", genre: "Rock" })
		expect(band.id).toBe(1)
	})

	test("can create a Musician", async () => {
		let musician = await Musician.create({ name: "Drummer", instrument: "Drums" })
		expect(musician.id).toBe(1)
	})

	test("can update a Band", async () => {
		let band = await Band.create({ name: "Smash Mouth", genre: "Rock" })
		let findBand = await Band.findByPk(1)
		let updatedBand = await findBand.update({
			genre: "Alternative",
		})
		expect(updatedBand.genre).toBe("Alternative")
	})

	test("can update a Musician", async () => {
		let musician = await Musician.create({ name: "Drummer", instrument: "Drums" })
		let findMusician = await Musician.findByPk(1)
		let updatedMusician = await findMusician.update({
			instrument: "Drumset",
		})
		expect(updatedMusician.instrument).toBe("Drumset")
	})

	test("can delete a Band", async () => {
		let band1 = await Band.create({ name: "Smash Mouth", genre: "Rock" })
		let band2 = await Band.create({ name: "Dropkick Murphy", genre: "Celtic Rock" })
		let findBand = await Band.findByPk(1)
		let deleteBand = await findBand.destroy()
		expect(deleteBand.name).toBe("Smash Mouth")
	})

	test("can delete a Musician", async () => {
		let musician1 = await Musician.create({ name: "Drummer", instrument: "Drums" })
		let musician2 = await Musician.create({ name: "Singer", instrument: "Microphone" })
		let findMusician = await Musician.findByPk(1)
		let deleteMusician = await findMusician.destroy()
		expect(deleteMusician.name).toBe("Drummer")
	})

	test("can create a Song", async () => {
		let song = await Song.create({ title: "All Star", year: 1999, length: 237 })
		expect(song.id).toBe(1)
	})

	test("can update a Song", async () => {
		let song = await Song.create({ title: "All Star", year: 1999, length: 237 })
		let findSong = await Song.findByPk(1)
		let updateSong = await findSong.update({
			length: 240,
		})
		expect(updateSong.length).toBe(240)
	})

	test("can delete a Song", async () => {
		let song1 = await Song.create({ title: "All Star", year: 1999, length: 237 })
		let song2 = await Song.create({ title: "Im shpping up to boston", year: 2005, length: 158 })
		let findSong = await Song.findByPk(1)
		let deleteSong = await findSong.destroy()
		expect(deleteSong.title).toBe("All Star")
	})
})
