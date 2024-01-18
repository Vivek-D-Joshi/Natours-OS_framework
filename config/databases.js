let conf = {
	natours: {
		primary: true,
		dbms: "mongodb",
		host: process.env.MONGODB_HOST,
		dbName: process.env.MONGODB_DATABASE_NAME,
		un: process.env.MONGODB_USERNAME,
		pw: process.env.MONGODB_PASSWORD,
	},
}

module.exports = conf
