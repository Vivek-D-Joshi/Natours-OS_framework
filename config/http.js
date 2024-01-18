let bodyParser = require("body-parser").json({ limit: "50mb" })

module.exports = {
	middleware: [bodyParser],
}
