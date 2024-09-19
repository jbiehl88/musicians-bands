const { db } = require("./db")
const { Band, Musician, Song, Manager } = require("./index")

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

	it("check Band/Musician association", async () => {
		let foundBand = await Band.create({ name: "Blink182", genre: "Rock" })
		let foundMusician = await Musician.create({ name: "Drummer", instrument: "Drums" })
		await foundMusician.setBand(foundBand)
		const bandMusicians = await Band.findOne({
			where: {
				name: "Blink182",
			},
			include: Musician,
		})
		expect(bandMusicians.Musicians[0].name).toBe("Drummer")
	})

	it("check Song/Band association", async () => {
		let foundSong = await Song.create({ title: "All the small things", year: 1999, length: 237 })
		let foundBand = await Band.create({ name: "Blink 182", genre: "Rock" })
		await foundSong.addBand(foundBand)
		const bandSongs = await Band.findOne({
			where: {
				name: "Blink 182",
			},
			include: Song,
		})
		expect(bandSongs.Songs[0].title).toBe("All the small things")
	})

	it("check Band/Manager association", async () => {
		let band = await Band.create({ name: "Sum41", genre: "Rock" })
		let manager = await Manager.create({ name: "Steve", email: "Steve@yup.com", salary: 100000, dateHired: "1/12/1999" })
		await manager.setBand(band)
		const bandWithManager = await Band.findOne({
			where: {
				name: "Sum41",
			},
			include: Manager,
		})
		expect(bandWithManager.Manager.name).toBe("Steve")
	})
})
