const Joi = require('joi');

const createCompany = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    website: Joi.string().uri().required(),
    category: Joi.string().required(),
  }),
};

const getCompanies = {
  query: Joi.object().keys({
    category: Joi.string(),
  }),
};

const getCompany = {
  params: Joi.object().keys({
    companyId: Joi.string(),
  }),
};

const updateCompany = {
  params: Joi.object().keys({
    companyId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      website: Joi.string().uri(),
      category: Joi.string(),
    })
    .min(1),
};

const deleteCompany = {
  params: Joi.object().keys({
    companyId: Joi.string(),
  }),
};

module.exports = {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
};
