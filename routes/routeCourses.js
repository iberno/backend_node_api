const express = require('express');

const {
  getCourses
} = require('../controllers/CoursesController.js');

const router = express.Router({ mergeParams: true});

router.route('/').get(getCourses)

module.exports = router;