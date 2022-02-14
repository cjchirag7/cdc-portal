const httpStatus = require('http-status');
const { Company } = require('../models');
const ApiError = require('../utils/ApiError');
const convertToSlug = require('../utils/convertToSlug');

/**
 * Create a company
 * @param {Object} companyBody
 * @returns {Promise<Company>}
 */
const createCompany = async (companyBody) => {
  if (await Company.isNameTaken(companyBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'A company with this name already exists.');
  }
  const _id = convertToSlug(companyBody.name);
  return Company.create({ ...companyBody, _id });
};

/**
 * Query for companies
 * @param {string} filter - Company category
 * @returns {Promise<QueryResult>}
 */
const queryCompanies = async (category) => {
  const query = {};
  if (category) {
    Object.assign(query, { category });
  }
  const companies = await Company.find(query);
  return companies;
};

/**
 * Get company by id
 * @param {ObjectId} id
 * @returns {Promise<Company>}
 */
const getCompanyById = async (id) => {
  return Company.findById(id);
};

/**
 * Update company by id
 * @param {ObjectId} companyId
 * @param {Object} updateBody
 * @returns {Promise<Company>}
 */
const updateCompanyById = async (companyId, updateBody) => {
  const company = await getCompanyById(companyId);
  if (!company) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
  }
  if (updateBody.name && (await Company.isNameTaken(updateBody.name, companyId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'A company with this name already exists');
  }
  Object.assign(company, updateBody);
  await company.save();
  return company;
};

/**
 * Delete company by id
 * @param {ObjectId} companyId
 * @returns {Promise<Company>}
 */
const deleteCompanyById = async (companyId) => {
  const company = await getCompanyById(companyId);
  if (!company) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
  }
  await company.remove();
  return company;
};

module.exports = {
  createCompany,
  queryCompanies,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
};
