const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBranch = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    courseType: Joi.string().required(),
    courseStruct: Joi.string(),
  }),
};

const getBranches = {
  query: Joi.object().keys({
    name: Joi.string(),
    courseType: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getBranch = {
  params: Joi.object().keys({
    branchId: Joi.string().custom(objectId),
  }),
};

const updateBranch = {
  params: Joi.object().keys({
    branchId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      courseType: Joi.string().required(),
      courseStruct: Joi.string(),
    })
    .min(1),
};

const deleteBranch = {
  params: Joi.object().keys({
    branchId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createBranch,
  getBranches,
  getBranch,
  updateBranch,
  deleteBranch,
};
