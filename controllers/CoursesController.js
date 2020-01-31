const ErrorResponse =  require('../utils/errorResponse')
const asyncHandler = require('../middleware/async');
const Course = require('../models/CourseModel');

// @desc    Get All Courses
// @route   GET /api/v1/Courses
// @route   GET /api/v1/Bootcamps/:bootcampID/Courses
// @access  Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if(req.params.bootcampId){
    query = Course.find({ bootcamp: req.params.bootcampId})
  } else {
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description'
    });
  }

  const courses = await query;

  res.status(200).json({
    succes: true,
    count: courses.length,
    data: courses
  })
})
