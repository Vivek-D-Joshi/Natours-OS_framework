let fs = require("fs")
module.exports = {
   port: process.env.PORT, // defaults to 1337
	logs: {
		/* To enable logs from your app */
		app: true,
		error: true,
		lighters: true,
	},
   // server host name
	hostName: process.env.HOSTNAME,
   
}