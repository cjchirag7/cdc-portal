const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { jnfService } = require('../services');

const createJnf = catchAsync(async (req, res) => {
  const jnf = await jnfService.createJnf(req.body, req.user.id);
  res.status(httpStatus.CREATED).send(jnf);
  // TODO: send email stating jnf created
});

const getJnfs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['createdBy']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await jnfService.queryJnfs(filter, options, req.user.role, req.user.id);
  res.send(result);
});

const getJnf = catchAsync(async (req, res) => {
  const jnf = await jnfService.getJnfById(req.params.jnfId);
  if (!jnf) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Jnf not found');
  }
  res.send(jnf);
});

const updateJnf = catchAsync(async (req, res) => {
  const jnf = await jnfService.updateJnfById(req.params.jnfId, req.body);
  res.send(jnf);
});

const deleteJnf = catchAsync(async (req, res) => {
  await jnfService.deleteJnfById(req.params.jnfId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createJnf,
  getJnfs,
  getJnf,
  updateJnf,
  deleteJnf,
};
