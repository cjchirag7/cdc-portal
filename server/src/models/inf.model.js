const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const contactSchema = require('./contact.model').schema;
const companySchema = require('./company.model').schema;

const infSchema = mongoose.Schema(
  {
    is2m: {
      type: Boolean,
      default: false,
    },
    is6mDual: {
      type: Boolean,
      default: false,
    },
    is6mMba: {
      type: Boolean,
      default: false,
    },
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
    mode: {
      type: String,
      enum: ['virtual', 'physical'],
      required: true,
    },
    postingPlace: {
      type: String,
      required: () => {
        return this.mode === 'physical';
      },
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
    stipend: {
      type: String,
      required: true,
      trim: true,
    },
    isPPO: {
      type: Boolean,
      required: true,
    },
    ctcDetails: {
      type: String,
      required: () => {
        return this.isPPO;
      },
      trim: true,
    },
    uploadedDocs: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
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
infSchema.plugin(toJSON);
infSchema.plugin(paginate);

/**
 * @typedef Inf
 */
const Inf = mongoose.model('Inf', infSchema);

module.exports = Inf;
