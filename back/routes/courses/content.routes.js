const express = require("express");
const router = express.Router();
const contentController = require("../../controllers/courses/content.controller");

router.get("/contents", contentController.getAllContents);
router.get(
  "/courses/:courseId/contents",
  contentController.getAllContentsByCourseId
);
router.get(
  "/courses/:courseId/chapters/:chapterId/contents",
  contentController.getAllContentsByChapterId
);
router.get(
  "/courses/:courseId/chapters/:chapterId/lessons/:lessonId/contents",
  contentController.getAllContentsByLessonId
);
router.post(
  "/courses/:courseId/chapters/:chapterId/lessons/:lessonId/contents",
  contentController.createContent
);
router.put(
  "/courses/:courseId/chapters/:chapterId/lessons/:lessonId/contents/:id",
  contentController.updateContent
);
router.get(
  "/courses/:courseId/chapters/:chapterId/lessons/:lessonId/contents/:id",
  contentController.getContentById
);
router.delete(
  "/courses/:courseId/chapters/:chapterId/lessons/:lessonId/contents/:id",
  contentController.deleteContent
);

module.exports = router;
