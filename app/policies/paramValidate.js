module.exports = async function (req, res, next) {
	const id = req.params.id
	if (id) {
		let tour = await Services.Tour.find({ _id: ObjectID(match[1]) })
		if (!tour) {
			return res.status(404).json({
				status: "fail",
				message: "Invalid Id",
			})
		}
	}
	next()
}
