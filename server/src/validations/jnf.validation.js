const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createJnf = {
  body: Joi.object().keys({
    primaryContact: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required(),
    }),
    secondaryContact: Joi.array().items(
      Joi.object().keys({
        email: Joi.string().email(),
        name: Joi.string(),
      })
    ),
    company: Joi.object().keys({
      name: Joi.string().required(),
      website: Joi.string().uri().required(),
      category: Joi.string().required(),
    }),
    jobDesignation: Joi.string().required(),
    jobDesc: Joi.string().required(),
    postingPlace: Joi.string().required(),
    branches: Joi.array().items(
      Joi.object().keys({
        branch: Joi.string().required().custom(objectId),
      })
    ),
    skillsRequired: Joi.string(),
    eligCriteria: Joi.string().required(),
    testType: Joi.string().required(),
    otherRound: Joi.string().required(),
    ctc: Joi.number().required(),
    ctcBreakup: Joi.string().required(),
    createdBy: Joi.string().required().custom(objectId),
    gradYear: Joi.number().required(),
  }),
};

const getJnfs = {
  query: Joi.object().keys({
    createdBy: Joi.string().custom(objectId),
  }),
};

const getJnf = {
  params: Joi.object().keys({
    jnfId: Joi.string().custom(objectId),
  }),
};

const updateJnf = {
  params: Joi.object().keys({
    jnfId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      primaryContact: Joi.object().keys({
        email: Joi.string().required().email(),
        name: Joi.string().required(),
      }),
      secondaryContact: Joi.array().items(
        Joi.object().keys({
          email: Joi.string().required().email(),
          name: Joi.string().required(),
        })
      ),
      company: Joi.object().keys({
        name: Joi.string().required(),
        website: Joi.string().uri().required(),
        category: Joi.string().required(),
      }),
      jobDesignation: Joi.string().required(),
      jobDesc: Joi.string().required(),
      postingPlace: Joi.string().required(),
      branches: Joi.array().items(
        Joi.object().keys({
          branch: Joi.string().required().custom(objectId),
        })
      ),
      skillsRequired: Joi.string(),
      eligCriteria: Joi.string().required(),
      testType: Joi.string().required(),
      otherRound: Joi.string().required(),
      ctc: Joi.number().required(),
      ctcBreakup: Joi.string().required(),
      createdBy: Joi.string().required().custom(objectId),
      gradYear: Joi.number().required(),
    })
    .min(1),
};

const deleteJnf = {
  params: Joi.object().keys({
    jnfId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createJnf,
  getJnfs,
  getJnf,
  updateJnf,
  deleteJnf,
};
