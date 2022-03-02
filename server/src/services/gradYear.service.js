const httpStatus = require('http-status');
const { GradYear } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a gradYear
 * @param {Object} gradYearBody
 * @returns {Promise<GradYear>}
 */
const createGradYear = async (gradYearBody) => {
  return GradYear.create(gradYearBody);
};

/**
 * Get gradYear by id
 * @param {ObjectId} id
 * @returns {Promise<GradYear>}
 */
const getGradYearById = async (id) => {
  return GradYear.findById(id);
};

/**
 * Update gradYear by id
 * @param {ObjectId} courseId
 * @param {Object} updateBody
 * @returns {Promise<GradYear>}
 */
const updateGradYearById = async (courseId, updateBody) => {
  const gradYear = await getGradYearById(courseId);
  if (!gradYear) {
    throw new ApiError(httpStatus.NOT_FOUND, 'GradYear not found');
  }
  Object.assign(gradYear, updateBody);
  await gradYear.save();
  return gradYear;
};

module.exports = {
  createGradYear,
  getGradYearById,
  updateGradYearById,
};
