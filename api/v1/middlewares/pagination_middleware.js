module.exports = function paginateModel(model, populateColum) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let resultsData = {};
    if (startIndex > 0) {
      resultsData.prev = {
        page: page - 1,
        limit
      };
    }
    if (endIndex < (await model.countDocuments().exec())) {
      resultsData.next = {
        page: page + 1,
        limit
      };
    }

    // console.log(startIndex, endIndex);
    try {
      const models = await model
        .find()
        .limit(limit)
        .skip(startIndex)
        .populate(populateColum)
        .select("-__v");
      resultsData.count = models.length;
      resultsData.result = models;
      res.results = resultsData;
      next();
    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  };
};
