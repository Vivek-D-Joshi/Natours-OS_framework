const message = require("../../config/message")

module.exports.policies = ["paramValidate"]

module.exports.routes = {
	"GET /single/:id": async (req, res) => {
		try {
			let tour = await Services.Tour.find({ _id: new ObjectID(req.params.id) })
			await Services.Respond.success(res, tour)
		} catch (err) {
			await Services.Respond.error(res, err.message)
		}
	},
	"GET /": async (req, res) => {
		try {
			const query = await Services.Utility.parseJSONStrings(req.query)
			let tour = await Services.Tour.getTours(query)
			await Services.Respond.success(res, tour)
		} catch (err) {
			await Services.Respond.error(res, err.message)
		}
	},
	"POST /": async (req, res) => {
		try {
			const tour = await Services.Tour.find({ name: req.body.name })
			if (tour) {
				await Services.Respond.error(res, message.recordAlreadyExist)
				return
			}
			const newTour = await Services.Tour.insert(req.body)
			await Services.Respond.success(res, newTour)
		} catch (error) {
			await Services.Respond.error(res, err.message)
		}
	},
	"PATCH /single/:id": async (req, res) => {
		try {
			let tour = await Services.Tour.update(req.params.id, req.body)
			if (!tour) {
				await Services.Respond.error(res, message.updateFailed)
			}
			Services.Respond.success(res, tour)
		} catch (error) {
			await Services.Respond.error(res, message.updateFailed)
		}
	},
	"DELETE /single/:id": async (req, res) => {
		try {
			await Services.Tour.delete(req.params.id)
			Services.Respond.success(res, tour)
		} catch (error) {
			await Services.Respond.error(res, err.message)
		}
	},
	"GET /tourstats": async (req, res) => {
		try {
			const stats = await Services.Tour.getToursStats()
			await Services.Respond.success(res, stats)
		} catch (error) {
			await Services.Respond.error(res, error.message)
		}
	},
	"GET /monthlyPlan/:year": async (req, res) => {
		try {
			const stats = await Services.Tour.getMonthlyPlan(req.params.year)
			await Services.Respond.success(res, stats)
		} catch (error) {
			await Services.Respond.error(res, error.message)
		}
	},
}
