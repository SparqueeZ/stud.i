const express = require("express");
const router = express.Router();
const lessonController = require("../../controllers/courses/lesson.controller");

router.get("/lessons", lessonController.getAllLessons);
router.get(
  "/courses/:courseId/lessons",
  lessonController.getAllLessonsByCourseId
);
router.get(
  "/courses/:courseId/chapters/:chapterId/lessons",
  lessonController.getAllLessonsByChapterId
);
router.get(
  "/courses/:courseId/chapters/:chapterId/lessons/:id",
  lessonController.getLessonById
);
router.post(
  "/courses/:courseId/chapters/:chapterId/lessons",
  lessonController.createLesson
);
router.put(
  "/courses/:courseId/chapters/:chapterId/lessons/:id",
  lessonController.updateLesson
);
router.delete(
  "/courses/:courseId/chapters/:chapterId/lessons/:id",
  lessonController.deleteLesson
);

module.exports = router;
