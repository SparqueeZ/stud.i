const { Course, Chapter, Lesson } = require("../models");

const checkIfCourseExists = async (courseId, res) => {
  const course = await Course.findByPk(courseId);
  if (!course) {
    console.warn(`[WARN] Course ${courseId} not found.`);
    res.status(404).json({ error: "Course not found." });
    return null;
  }
  return course;
};

const checkIfChapterExists = async (chapterId, res) => {
  const chapter = await Chapter.findByPk(chapterId);
  if (!chapter) {
    console.warn(`[WARN] Chapter ${chapterId} not found.`);
    res.status(404).json({ error: "Chapter not found." });
    return null;
  }
  return chapter;
};

const checkIfLessonExists = async (lessonId) => {
  const lesson = await Lesson.findByPk(lessonId);
  if (!lesson) {
    console.warn(`[WARN] Lesson ${lessonId} not found.`);
    return null;
  }
  console.log(`[SUCCESS] Lesson ${lessonId} found.`);
  return lesson;
};

module.exports = {
  checkIfCourseExists,
  checkIfChapterExists,
  checkIfLessonExists,
};
