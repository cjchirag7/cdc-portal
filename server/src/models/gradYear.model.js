const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const gradYearSchema = mongoose.Schema(
  {
    placement: {
      type: Number,
    },
    inf2m: {
      type: Number,
    },
    inf6m: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
gradYearSchema.plugin(toJSON);

/**
 * @typedef GradYear
 */
const GradYear = mongoose.model('GradYear', gradYearSchema);

module.exports = GradYear;
