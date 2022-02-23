const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const contactSchema = require('./contact.model').schema;
const companySchema = require('./company.model').schema;

const jnfSchema = mongoose.Schema(
  {
    primaryContact: contactSchema,
    secondaryContact: [contactSchema],
    company: companySchema,
    jobDesignation: {
      type: String,
      required: true,
      trim: true,
    },
    jobDesc: {
      type: String,
      required: true,
      trim: true,
    },
    postingPlace: {
      type: String,
      required: true,
      trim: true,
    },
    branches: [
      {
        branch: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Branch',
        },
      },
    ],
    skillsRequired: [
      {
        type: String,
        trim: true,
      },
    ],
    eligCriteria: {
      type: String,
      required: true,
      trim: true,
    },
    resume: {
      type: Boolean,
      required: true,
    },
    testType: {
      type: String,
      required: true,
      trim: true,
    },
    otherRound: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    totalRounds: {
      type: Number,
    },
    offerRange: {
      type: String,
    },
    ctc: {
      type: Number,
      required: true,
      trim: true,
    },
    ctcBreakup: {
      type: String,
      required: true,
      trim: true,
    },
    bondDetail: {
      type: String,
      trim: true,
    },
    uploadedDocs: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    gradYear: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
jnfSchema.plugin(toJSON);
jnfSchema.plugin(paginate);

/**
 * @typedef Jnf
 */
const Jnf = mongoose.model('Jnf', jnfSchema);

module.exports = Jnf;
