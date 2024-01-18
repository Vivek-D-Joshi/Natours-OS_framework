module.exports = {
	success: async (res, result) => {
		res.status(200).json({
			status: "Success",
			result
		})
	},
	error: async (res, message) => {
		res.status(500).json({
			status: "fail",
			message: `${message}`,
		})
	},
}
