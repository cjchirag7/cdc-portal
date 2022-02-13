const Joi = require('joi');
const { slugId } = require('./custom.validation');

const createCourse = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    duration: Joi.number().integer().required(),
    adm_mode: Joi.string(),
  }),
};

const getCourses = {
  query: Joi.object().keys({
    name: Joi.string(),
    duration: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCourse = {
  params: Joi.object().keys({
    courseId: Joi.string().custom(slugId),
  }),
};

const updateCourse = {
  params: Joi.object().keys({
    courseId: Joi.required().custom(slugId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      duration: Joi.number().integer().required(),
      adm_mode: Joi.string(),
    })
    .min(1),
};

const deleteCourse = {
  params: Joi.object().keys({
    courseId: Joi.string().custom(slugId),
  }),
};

module.exports = {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
};
