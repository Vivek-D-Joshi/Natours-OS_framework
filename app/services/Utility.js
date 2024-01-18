module.exports = {
	parseJSONStrings: async function (obj) {
		const jsonRegex = /^\{(?:.|\n)*\}$/
		for (const key in obj) {
			if (typeof obj[key] === "string" && jsonRegex.test(obj[key])) {
				obj[key] = JSON.parse(obj[key])
				await this.parseJSONStrings(obj[key])
			}
		}
		return obj
	},
}
