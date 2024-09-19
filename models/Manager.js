const { db, DataTypes, Model } = require("../db")

class Manager extends Model {}

Manager.init(
	{
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		salary: DataTypes.INTEGER,
		dateHired: DataTypes.STRING,
	},
	{
		sequelize: db,
		modelName: "Manager",
	}
)

module.exports = {
	Manager,
}
