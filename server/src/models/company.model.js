const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const companySchema = mongoose.Schema(
  {
    _id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    website: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
companySchema.plugin(toJSON);
companySchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The company's name
 * @param {ObjectId} [excludeCompanyId] - The id of the company to be excluded
 * @returns {Promise<boolean>}
 */
companySchema.statics.isNameTaken = async function (name, excludeCompanyId) {
  const company = await this.findOne({ name, _id: { $ne: excludeCompanyId } });
  return !!company;
};

/**
 * @typedef Company
 */
const Company = mongoose.model('Company', companySchema);

module.exports = Company;
