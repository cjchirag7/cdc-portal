const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { courseService } = require('../services');

const createCourse = catchAsync(async (req, res) => {
  const course = await courseService.createCourse(req.body);
  res.status(httpStatus.CREATED).send(course);
});

const getCourses = catchAsync(async (req, res) => {
  const result = await courseService.queryCourses(req.query.duration);
  res.send(result);
});

const getCourse = catchAsync(async (req, res) => {
  const course = await courseService.getCourseById(req.params.courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }
  res.send(course);
});

const updateCourse = catchAsync(async (req, res) => {
  const course = await courseService.updateCourseById(req.params.courseId, req.body);
  res.send(course);
});

const deleteCourse = catchAsync(async (req, res) => {
  await courseService.deleteCourseById(req.params.courseId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
};
