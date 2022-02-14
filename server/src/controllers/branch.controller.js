const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { branchService } = require('../services');

const createBranch = catchAsync(async (req, res) => {
  const branch = await branchService.createBranch(req.body);
  res.status(httpStatus.CREATED).send(branch);
});

const getBranches = catchAsync(async (req, res) => {
  const result = await branchService.queryBranches(req.query.courseType);
  res.send(result);
});

const getBranch = catchAsync(async (req, res) => {
  const branch = await branchService.getBranchById(req.params.branchId);
  if (!branch) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Branch not found');
  }
  res.send(branch);
});

const updateBranch = catchAsync(async (req, res) => {
  const branch = await branchService.updateBranchById(req.params.branchId, req.body);
  res.send(branch);
});

const deleteBranch = catchAsync(async (req, res) => {
  await branchService.deleteBranchById(req.params.branchId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createBranch,
  getBranches,
  getBranch,
  updateBranch,
  deleteBranch,
};
