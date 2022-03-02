const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createInf = {
  body: Joi.object().keys({
    primaryContact: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required(),
      designation: Joi.string(),
      phone: Joi.string(),
    }),
    secondaryContact: Joi.array().items(
      Joi.object().keys({
        email: Joi.string().email(),
        name: Joi.string(),
        designation: Joi.string(),
        phone: Joi.string(),
      })
    ),
    company: Joi.object().keys({
      name: Joi.string().required(),
      website: Joi.string().uri().required(),
      category: Joi.string().required(),
    }),
    jobDesignation: Joi.string().required(),
    jobDesc: Joi.string().required(),
    mode: Joi.string().required().valid('physical', 'virtual'),
    postingPlace: Joi.when('mode', { is: 'physical', then: Joi.string().required(), otherwise: Joi.string() }),
    branches: Joi.array().items(
      Joi.object().keys({
        branch: Joi.string().required().custom(objectId),
      })
    ),
    skillsRequired: Joi.array().items(Joi.string()),
    eligCriteria: Joi.string().required(),
    resume: Joi.boolean().required(),
    testType: Joi.string().required(),
    otherRound: Joi.array().items(Joi.string().required()),
    totalRounds: Joi.number(),
    offerRange: Joi.string(),
    stipend: Joi.string().required(),
    isPPO: Joi.boolean().required(),
    ctcDetails: Joi.when('isPPO', { is: true, then: Joi.string().required(), otherwise: Joi.string() }),
    uploadedDocs: Joi.string(),
    createdBy: Joi.string().custom(objectId),
    gradYear: Joi.number().required(),
    is2m: Joi.boolean(),
    is6mDual: Joi.boolean(),
    is6mMba: Joi.boolean(),
  }),
};

const getInfs = {
  query: Joi.object().keys({
    createdBy: Joi.string().custom(objectId),
    is2m: Joi.boolean(),
    is6mDual: Joi.boolean(),
    is6mMba: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getInf = {
  params: Joi.object().keys({
    infId: Joi.string().custom(objectId),
  }),
};

const updateInf = {
  params: Joi.object().keys({
    infId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      primaryContact: Joi.object().keys({
        email: Joi.string().required().email(),
        name: Joi.string().required(),
        designation: Joi.string(),
        phone: Joi.string(),
      }),
      secondaryContact: Joi.array().items(
        Joi.object().keys({
          email: Joi.string().email(),
          name: Joi.string(),
          designation: Joi.string(),
          phone: Joi.string(),
        })
      ),
      company: Joi.object().keys({
        name: Joi.string().required(),
        website: Joi.string().uri().required(),
        category: Joi.string().required(),
      }),
      jobDesignation: Joi.string(),
      jobDesc: Joi.string(),
      mode: Joi.string().valid('physical', 'virtual'),
      postingPlace: Joi.when('mode', { is: 'physical', then: Joi.string().required(), otherwise: Joi.string() }),
      branches: Joi.array().items(
        Joi.object().keys({
          branch: Joi.string().required().custom(objectId),
        })
      ),
      skillsRequired: Joi.array().items(Joi.string()),
      eligCriteria: Joi.string(),
      resume: Joi.boolean(),
      testType: Joi.string(),
      otherRound: Joi.array().items(Joi.string()),
      totalRounds: Joi.number(),
      offerRange: Joi.string(),
      stipend: Joi.string(),
      isPPO: Joi.boolean(),
      ctcDetails: Joi.when('isPPO', { is: true, then: Joi.string().required(), otherwise: Joi.string() }),
      uploadedDocs: Joi.string(),
      gradYear: Joi.number(),
      is2m: Joi.boolean(),
      is6mDual: Joi.boolean(),
      is6mMba: Joi.boolean(),
    })
    .min(1),
};

const deleteInf = {
  params: Joi.object().keys({
    infId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createInf,
  getInfs,
  getInf,
  updateInf,
  deleteInf,
};
