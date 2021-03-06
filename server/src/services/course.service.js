const httpStatus = require('http-status');
const { Course } = require('../models');
const ApiError = require('../utils/ApiError');
const convertToSlug = require('../utils/convertToSlug');

/**
 * Create a course
 * @param {Object} courseBody
 * @returns {Promise<Course>}
 */
const createCourse = async (courseBody) => {
  if (await Course.isNameTaken(courseBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'A course with this name already exists.');
  }
  const _id = convertToSlug(courseBody.name);
  return Course.create({ ...courseBody, _id });
};

/**
 * Query for courses
 * @param {number} duration - Course duration
 * @returns {Promise<QueryResult>}
 */
const queryCourses = async (duration) => {
  const query = {};
  if (duration) {
    Object.assign(query, { duration });
  }
  const courses = await Course.find(query);
  return courses;
};

/**
 * Get course by id
 * @param {ObjectId} id
 * @returns {Promise<Course>}
 */
const getCourseById = async (id) => {
  return Course.findById(id);
};

/**
 * Update course by id
 * @param {ObjectId} courseId
 * @param {Object} updateBody
 * @returns {Promise<Course>}
 */
const updateCourseById = async (courseId, updateBody) => {
  const course = await getCourseById(courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }
  if (updateBody.name && (await Course.isNameTaken(updateBody.name, courseId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'A course with this name already exists');
  }
  Object.assign(course, updateBody);
  await course.save();
  return course;
};

/**
 * Delete course by id
 * @param {ObjectId} courseId
 * @returns {Promise<Course>}
 */
const deleteCourseById = async (courseId) => {
  const course = await getCourseById(courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }
  await course.remove();
  return course;
};

module.exports = {
  createCourse,
  queryCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
};
