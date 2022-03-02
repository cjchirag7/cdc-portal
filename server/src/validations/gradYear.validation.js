const Joi = require('joi');

const createGradYear = {
  body: Joi.object().keys({
    placement: Joi.number(),
    inf2m: Joi.number(),
    inf6m: Joi.number(),
  }),
};

const getGradYear = {
  params: Joi.object().keys({
    gradYearId: Joi.string(),
  }),
};

const updateGradYear = {
  params: Joi.object().keys({
    gradYearId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      placement: Joi.number(),
      inf2m: Joi.number(),
      inf6m: Joi.number(),
    })
    .min(1),
};

module.exports = {
  createGradYear,
  getGradYear,
  updateGradYear,
};
