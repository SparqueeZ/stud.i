const express = require("express");
const router = express.Router();
const chapterController = require("../../controllers/courses/chapter.controller");

router.get("/chapters", chapterController.getAllChapters);
router.get(
  "/courses/:courseId/chapters",
  chapterController.getAllChaptersByCourseId
);
router.post("/courses/:courseId/chapters", chapterController.createChapter);
router.get("/courses/:courseId/chapters/:id", chapterController.getChapterById);
router.put("/courses/:courseId/chapters/:id", chapterController.updateChapter);
router.delete(
  "/courses/:courseId/chapters/:id",
  chapterController.deleteChapter
);

module.exports = router;
