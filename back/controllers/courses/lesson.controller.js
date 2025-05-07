const Course = require("../../models/Course");
const Chapter = require("../../models/Chapter");
const Lesson = require("../../models/Lesson");
const Document = require("../../models/Document");
const Content = require("../../models/Content");

const fullLesson = {
  include: [
    {
      model: Document,
    },
    {
      model: Content,
    },
  ],
};

const checkIfCourseExists = async (courseId, res) => {
  const course = await Course.findByPk(courseId);
  if (!course) {
    console.warn(`[WARN] Course ${courseId} not found.`);
    res.status(404).json({ error: "Course not found." });
    return false;
  }
  return true;
};
const checkIfChapterExists = async (chapterId, res) => {
  const chapter = await Chapter.findByPk(chapterId);
  if (!chapter) {
    console.warn(`[WARN] Chapter ${chapterId} not found.`);
    res.status(404).json({ error: "Chapter not found." });
    return false;
  }
  return true;
};
const checkIfLessonExists = async (lessonId, res) => {
  const lesson = await Lesson.findByPk(lessonId);
  if (!lesson) {
    console.warn(`[WARN] Lesson ${lessonId} not found.`);
    res.status(404).json({ error: "Lesson not found." });
    return false;
  }
  return true;
};

exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.findAll(fullLesson);
    res.status(200).json(lessons);
  } catch (error) {
    console.error("Erreur lors de la récupération des leçons:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des leçons" });
  }
};

exports.getAllLessonsByCourseId = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    if (!(await checkIfCourseExists(courseId, res))) return;

    const lessons = await Lesson.findAll({
      include: [
        {
          model: Chapter,
          where: { courseId },
        },
      ],
    });

    res.status(200).json(lessons);
  } catch (error) {
    console.error("Erreur lors de la récupération des leçons:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des leçons" });
  }
};

exports.getAllLessonsByChapterId = async (req, res) => {
  const chapterId = req.params.chapterId;
  try {
    if (!(await checkIfChapterExists(chapterId, res))) return;

    const lessons = await Lesson.findAll({
      where: { chapterId },
      include: [Document, Content],
    });

    res.status(200).json(lessons);
  } catch (error) {
    console.error("Erreur lors de la récupération des leçons:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des leçons" });
  }
};

exports.getLessonById = async (req, res) => {
  const lessonId = req.params.id;
  try {
    if (!(await checkIfLessonExists(lessonId, res))) return;

    const lesson = await Lesson.findByPk(lessonId, fullLesson);

    res.status(200).json(lesson);
  } catch (error) {
    console.error("Erreur lors de la récupération de la leçon:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de la leçon" });
  }
};

exports.createLesson = async (req, res) => {
  const chapterId = req.params.chapterId;
  const { title, description } = req.body;
  try {
    if (!(await checkIfChapterExists(chapterId, res))) return;

    const lesson = await Lesson.create({ title, description, chapterId });

    res.status(201).json(lesson);
  } catch (error) {
    console.error("Erreur lors de la création de la leçon:", error);
    res.status(500).json({ error: "Erreur lors de la création de la leçon" });
  }
};

exports.updateLesson = async (req, res) => {
  const lessonId = req.params.id;
  if (!lessonId) {
    return res.status(400).json({ error: "Lesson ID is required." });
  }
  try {
    const lesson = await Lesson.findByPk(lessonId);
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found." });
    }
    await lesson.update(req.body);
    res.status(200).json(lesson);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la leçon:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de la leçon" });
  }
};

exports.deleteLesson = async (req, res) => {
  const lessonId = req.params.id;
  try {
    if (!(await checkIfLessonExists(lessonId, res))) return;

    await Lesson.destroy({ where: { id: lessonId } });

    res.status(204).end();
  } catch (error) {
    console.error("Erreur lors de la suppression de la leçon:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de la leçon" });
  }
};
