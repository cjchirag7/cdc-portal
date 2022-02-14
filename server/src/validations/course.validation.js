const Joi = require('joi');

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
    courseId: Joi.string(),
  }),
};

const updateCourse = {
  params: Joi.object().keys({
    courseId: Joi.string().required(),
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
    courseId: Joi.string(),
  }),
};

module.exports = {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
};
