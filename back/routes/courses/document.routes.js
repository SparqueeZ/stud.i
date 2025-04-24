const express = require("express");
const router = express.Router();
const documentController = require("../../controllers/courses/document.controller");

router.get("/documents", documentController.getAllDocuments);
router.get(
  "/courses/:courseId/documents",
  documentController.getAllDocumentsByCourseId
);
router.get(
  "/courses/:courseId/chapters/:chapterId/documents",
  documentController.getAllDocumentsByChapterId
);
router.get(
  "/courses/:courseId/chapters/:chapterId/lessons/:lessonId/documents",
  documentController.getAllDocumentsByLessonId
);
router.post(
  "/courses/:courseId/chapters/:chapterId/lessons/:lessonId/documents",
  documentController.createDocument
);
router.put(
  "/courses/:courseId/chapters/:chapterId/lessons/:lessonId/documents/:id",
  documentController.updateDocument
);
router.delete(
  "/courses/:courseId/chapters/:chapterId/lessons/:lessonId/documents/:id",
  documentController.deleteDocument
);

module.exports = router;
