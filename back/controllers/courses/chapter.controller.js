const Course = require("../../models/Course");
const Chapter = require("../../models/Chapter");
const Lesson = require("../../models/Lesson");
const Document = require("../../models/Document");
const Content = require("../../models/Content");
const sequelize = require("../../config/database");
const { Op } = require("sequelize");

const fullChapter = {
  include: [
    {
      model: Lesson,
      include: [
        {
          model: Document,
        },
        {
          model: Content,
        },
      ],
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

exports.getAllChapters = async (req, res) => {
  try {
    const chapters = await Chapter.findAll(fullChapter);
    res.status(200).json(chapters);
  } catch (error) {
    console.error("Erreur lors de la récupération des chapitres:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des chapitres" });
  }
};

exports.getAllChaptersByCourseId = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    if (!(await checkIfCourseExists(courseId, res))) return;

    const chapters = await Chapter.findAll(
      Object.assign({ where: { courseId } }, fullChapter)
    );
    res.status(200).json(chapters);
  } catch (error) {
    console.error("Erreur lors de la récupération des chapitres:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des chapitres" });
  }
};

exports.createChapter = async (req, res) => {
  const courseId = req.params.courseId;
  const { title, open } = req.body;
  try {
    if (!(await checkIfCourseExists(courseId, res))) return;

    const chapter = await Chapter.create({ title, open, courseId });
    res.status(201).json(chapter);
  } catch (error) {
    console.error("Erreur lors de la création du chapitre:", error);
    res.status(500).json({ error: "Erreur lors de la création du chapitre" });
  }
};

exports.getChapterById = async (req, res) => {
  const courseId = req.params.courseId;
  const chapterId = req.params.id;

  try {
    if (!(await checkIfCourseExists(courseId, res))) return;
    if (!(await checkIfChapterExists(chapterId, res))) return;

    const chapter = await Chapter.findByPk(chapterId, fullChapter);
    res.status(200).json(chapter);
  } catch (error) {
    console.error("Erreur lors de la récupération du chapitre:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération du chapitre" });
  }
};

exports.updateChapter = async (req, res) => {
  const courseId = req.params.courseId;
  const chapterId = req.params.id;
  const { title, open } = req.body;
  try {
    if (!(await checkIfCourseExists(courseId, res))) return;
    if (!(await checkIfChapterExists(chapterId, res))) return;

    const chapter = await Chapter.findByPk(chapterId);
    await chapter.update({ title, open });
    res.status(200).json(chapter);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du chapitre:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour du chapitre" });
  }
};

exports.deleteChapter = async (req, res) => {
  const courseId = req.params.courseId;
  const chapterId = req.params.id;

  try {
    if (!(await checkIfCourseExists(courseId, res))) return;
    if (!(await checkIfChapterExists(chapterId, res))) return;

    const chapter = await Chapter.findByPk(chapterId);
    await chapter.destroy();
    res.status(204).json();
  } catch (error) {
    console.error("Erreur lors de la suppression du chapitre:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression du chapitre" });
  }
};
