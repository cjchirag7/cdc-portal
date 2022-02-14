const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const branchSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    courseType: {
      type: String,
      required: true,
      trim: true,
      ref: 'Course',
    },
    courseStruct: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
branchSchema.plugin(toJSON);

/**
 * Check if any data exists with same branch and course type
 * @param {string} name - The branch's name
 * @param {string} courseType - The course type of the branch
 * @param {ObjectId} [excludeBranchId] - The id of the branch to be excluded
 * @returns {Promise<boolean>}
 */
branchSchema.statics.isNameTaken = async function (name, courseType, excludeBranchId) {
  const branch = await this.findOne({ $and: [{ name }, { courseType }], _id: { $ne: excludeBranchId } });
  return !!branch;
};

/**
 * @typedef Branch
 */
const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;
