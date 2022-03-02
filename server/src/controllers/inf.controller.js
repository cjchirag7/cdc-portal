const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { infService } = require('../services');

const createInf = catchAsync(async (req, res) => {
  const inf = await infService.createInf(req.body, req.user.id);
  res.status(httpStatus.CREATED).send(inf);
  // TODO: send email stating inf created
});

const getInfs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['createdBy', 'is2m', 'is6mDual', 'is6mMba']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await infService.queryInfs(filter, options, req.user.role, req.user.id);
  res.send(result);
});

const getInf = catchAsync(async (req, res) => {
  const inf = await infService.getInfById(req.params.infId);
  if (!inf) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Inf not found');
  }
  res.send(inf);
});

const updateInf = catchAsync(async (req, res) => {
  const inf = await infService.updateInfById(req.params.infId, req.body);
  res.send(inf);
  // TODO: send email stating inf updated
});

const deleteInf = catchAsync(async (req, res) => {
  await infService.deleteInfById(req.params.infId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createInf,
  getInfs,
  getInf,
  updateInf,
  deleteInf,
};
