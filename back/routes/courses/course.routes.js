const express = require("express");
const router = express.Router();
const courseController = require("../../controllers/courses/course.controller");

// new
router.get("/courses", courseController.getAllCourses);
router.post("/courses", courseController.createCourse);
router.get("/courses/:id", courseController.getCourseById);
router.put("/courses/:id", courseController.updateCourse);
router.delete("/courses/:id", courseController.deleteCourse);

// old
// router.get("/courses/:id", courseController.getCourseById);
// router.put("/courses/full/:id", courseController.updateFullCourse);
// router.delete("/courses/full/:id", courseController.deleteFullCourse);

module.exports = router;
