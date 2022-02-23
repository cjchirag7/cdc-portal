const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createJnf = {
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
    postingPlace: Joi.string().required(),
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
    ctc: Joi.number().required(),
    ctcBreakup: Joi.string().required(),
    bondDetail: Joi.string(),
    uploadedDocs: Joi.string(),
    createdBy: Joi.string().required().custom(objectId),
    gradYear: Joi.number().required(),
  }),
};

const getJnfs = {
  query: Joi.object().keys({
    createdBy: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
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
      postingPlace: Joi.string(),
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
      ctc: Joi.number(),
      ctcBreakup: Joi.string(),
      bondDetail: Joi.string(),
      uploadedDocs: Joi.string(),
      gradYear: Joi.number(),
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
