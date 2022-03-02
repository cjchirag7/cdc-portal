const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { gradYearService } = require('../services');

const createGradYear = catchAsync(async (req, res) => {
  const gradYear = await gradYearService.createGradYear(req.body);
  res.status(httpStatus.CREATED).send(gradYear);
});

const getGradYear = catchAsync(async (req, res) => {
  const gradYear = await gradYearService.getGradYearById(req.params.gradYearId);
  if (!gradYear) {
    throw new ApiError(httpStatus.NOT_FOUND, 'GradYear not found');
  }
  res.send(gradYear);
});

const updateGradYear = catchAsync(async (req, res) => {
  const gradYear = await gradYearService.updateGradYearById(req.params.gradYearId, req.body);
  res.send(gradYear);
});

module.exports = {
  createGradYear,
  getGradYear,
  updateGradYear,
};
