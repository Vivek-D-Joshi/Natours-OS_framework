module.exports = {
	find: async (query) => await db.tours.findOne(query),
	getTours: async (query) => {
		const filter = { $match: query.filter || {} }
		const sort = { $sort: query.sortBy || { _id: 1 } }
		const projectionArray =
			query.projection?.split(",")?.length >= 1 ? query.projection?.split(",").map((el) => ({ [el]: 1 })) : []
		const mergedObj = Object.assign({}, ...projectionArray);
		const projection =
			{ $project: Object.keys(mergedObj).length <= 0 ? { __v: 0 }
			: Object.assign({}, ...projectionArray)} 
		const skip = (query.pageNumber - 1) * query.pageSize || 0
		const limit = query.pageSize*1 || 10
		const pipeline = [filter, sort, projection]
		const data = await db.tours.aggregate(pipeline).skip(skip).limit(limit).toArray()
		return {meta:{page: query.pageNumber || 1, size: limit, records: data.length}, data}
	},
	insert: async (data) => {
		let result = await db.tours.insertOne(data)
		return result.ops
	},
	update: async (id, data) => {
		let result = await db.tours.updateOne({ _id: new ObjectID(id) }, { $set: data })
		if (result.nModified > 0) {
			return true
		}
		return false
	},
	delete: async (id) => await db.tours.deleteOne({ _id: new ObjectID(id) }),
	getToursStats: async () =>
		await db.tours.aggregate([
			{ $match: { ratingAvg: { $gte: 0 } } },
			{
				$group: {
					_id: "$difficulty",
					numTours: { $sum: 1 },
					numRatings: { $sum: "$ratingQuantity" },
					avgRating: { $avg: "$ratingAvg" },
					avgPrice: { $avg: "$price" },
					minPrice: { $min: "$price" },
					maxPrice: { $max: "$price" },
				},
			},
			{
				$sort: { avgPrice: 1 },
			},
		]).toArray(),
	getMonthlyPlan: async (year) => db.tours.aggregate(
		{ $unwind: "$startDates" },
		{
			$match: {
				startDates: {
					$gte: new Date(`${year}-01-01`),
					$lte: new Date(`${year}-12-31`),
				},
			},
		},
		{
			$group: {
				_id: { $month: "$startDates" },
				numTours: { $sum: 1 },
				Tours: { $push: "$name" },
			},
		},
		{ $addFields: { month: "$_id" } },
		{ $project: { _id: 0 } },
		{ $sort: { numTours: -1 } }
	).toArray()
}
