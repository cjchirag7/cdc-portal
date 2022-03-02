const httpStatus = require('http-status');
const { Inf } = require('../models');
const ApiError = require('../utils/ApiError');
const convertToSlug = require('../utils/convertToSlug');

/**
 * Create a inf
 * @param {Object} infBody
 * @returns {Promise<Inf>}
 */
const createInf = async (infBody, id) => {
  return Inf.create({
    ...infBody,
    company: { ...infBody.company, _id: convertToSlug(infBody.company.name) },
    createdBy: id,
  });
};

/**
 * Query for infs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} role - Whether user or admin
 * @param {ObjectId} createdBy - User ID
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryInfs = async (filter, options, role, createdBy) => {
  const displayFields = {
    createdBy: 1,
    _id: 1,
    company: 1,
    gradYear: 1,
    jobDesignation: 1,
    primaryContact: 1,
  };
  if (role === 'admin') {
    const infs = await Inf.paginate(filter, options, displayFields);
    return infs;
  }
  const infs = await Inf.find({ $and: [{ createdBy }, filter] }, displayFields);
  return infs;
};

/**
 * Get inf by id
 * @param {ObjectId} id
 * @returns {Promise<Inf>}
 */
const getInfById = async (id) => {
  return Inf.findById(id).populate('branches');
};

/**
 * Update inf by id
 * @param {ObjectId} infId
 * @param {Object} updateBody
 * @returns {Promise<Inf>}
 */
const updateInfById = async (infId, updateBody) => {
  const inf = await getInfById(infId);
  if (!inf) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Inf not found');
  }
  Object.assign(inf, updateBody);
  await inf.save();
  return inf;
};

/**
 * Delete inf by id
 * @param {ObjectId} infId
 * @returns {Promise<Inf>}
 */
const deleteInfById = async (infId) => {
  const inf = await getInfById(infId);
  if (!inf) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Inf not found');
  }
  await inf.remove();
  return inf;
};

module.exports = {
  createInf,
  queryInfs,
  getInfById,
  updateInfById,
  deleteInfById,
};
