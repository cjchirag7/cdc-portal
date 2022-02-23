const httpStatus = require('http-status');
const { Jnf } = require('../models');
const ApiError = require('../utils/ApiError');
const convertToSlug = require('../utils/convertToSlug');

/**
 * Create a jnf
 * @param {Object} jnfBody
 * @returns {Promise<Jnf>}
 */
const createJnf = async (jnfBody, id) => {
  return Jnf.create({
    ...jnfBody,
    company: { ...jnfBody.company, _id: convertToSlug(jnfBody.company.name) },
    createdBy: id,
  });
};

/**
 * Query for jnfs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} role - Whether user or admin
 * @param {ObjectId} createdBy - User ID
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryJnfs = async (filter, options, role, createdBy) => {
  const displayFields = { createdBy: 1, _id: 1, company: 1, gradYear: 1, jobDesignation: 1, primaryContact: 1 };
  if (role === 'admin') {
    const jnfs = await Jnf.paginate(filter, options, displayFields);
    return jnfs;
  }
  const jnfs = await Jnf.find({ createdBy }, displayFields);
  return jnfs;
};

/**
 * Get jnf by id
 * @param {ObjectId} id
 * @returns {Promise<Jnf>}
 */
const getJnfById = async (id) => {
  return Jnf.findById(id).populate('branches');
};

/**
 * Update jnf by id
 * @param {ObjectId} jnfId
 * @param {Object} updateBody
 * @returns {Promise<Jnf>}
 */
const updateJnfById = async (jnfId, updateBody) => {
  const jnf = await getJnfById(jnfId);
  if (!jnf) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Jnf not found');
  }
  Object.assign(jnf, updateBody);
  await jnf.save();
  return jnf;
};

/**
 * Delete jnf by id
 * @param {ObjectId} jnfId
 * @returns {Promise<Jnf>}
 */
const deleteJnfById = async (jnfId) => {
  const jnf = await getJnfById(jnfId);
  if (!jnf) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Jnf not found');
  }
  await jnf.remove();
  return jnf;
};

module.exports = {
  createJnf,
  queryJnfs,
  getJnfById,
  updateJnfById,
  deleteJnfById,
};
