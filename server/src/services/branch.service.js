const httpStatus = require('http-status');
const { Branch } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a branch
 * @param {Object} branchBody
 * @returns {Promise<Branch>}
 */
const createBranch = async (branchBody) => {
  if (await Branch.isNameTaken(branchBody.name, branchBody.courseType)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'A branch with this name and course type already exists.');
  }
  return Branch.create(branchBody);
};

/**
 * Query for branches
 * @param {string} courseType - Course type of branch
 * @returns {Promise<QueryResult>}
 */
const queryBranches = async (courseType) => {
  const query = {};
  if (courseType) {
    Object.assign(query, { courseType });
  }
  const branches = await Branch.find(query);
  return branches;
};

/**
 * Get branch by id
 * @param {ObjectId} id
 * @returns {Promise<Branch>}
 */
const getBranchById = async (id) => {
  return Branch.findById(id);
};

/**
 * Update branch by id
 * @param {ObjectId} branchId
 * @param {Object} updateBody
 * @returns {Promise<Branch>}
 */
const updateBranchById = async (branchId, updateBody) => {
  const branch = await getBranchById(branchId);
  if (!branch) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Branch not found');
  }
  if (updateBody.name && (await Branch.isNameTaken(updateBody.name, updateBody.courseType, branchId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'A branch with this name and course type already exists');
  }
  Object.assign(branch, updateBody);
  await branch.save();
  return branch;
};

/**
 * Delete branch by id
 * @param {ObjectId} branchId
 * @returns {Promise<Branch>}
 */
const deleteBranchById = async (branchId) => {
  const branch = await getBranchById(branchId);
  if (!branch) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Branch not found');
  }
  await branch.remove();
  return branch;
};

module.exports = {
  createBranch,
  queryBranches,
  getBranchById,
  updateBranchById,
  deleteBranchById,
};
