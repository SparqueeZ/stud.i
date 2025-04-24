const Course = require("../../models/Course");
const Chapter = require("../../models/Chapter");
const Lesson = require("../../models/Lesson");
const Document = require("../../models/Document");
const Content = require("../../models/Content");
const sequelize = require("../../config/database");
const { Op } = require("sequelize");

const fullCourse = {
  include: [
    {
      model: Chapter,
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
    },
  ],
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll(fullCourse);

    res.status(200).json(courses);
  } catch (error) {
    console.error("Erreur lors de la récupération des cours:", error);
    res.status(500).json({ error: "Erreur lors de la récupération des cours" });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    console.error("Erreur lors de la création du cours:", error);
    res.status(500).json({ error: "Erreur lors de la création du cours" });
  }
};

exports.updateCourse = async (req, res) => {
  const courseId = req.params.id;
  if (!courseId) {
    return res.status(400).json({ error: "Course ID is required." });
  }
  try {
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    }
    await course.update(req.body);
    res.status(200).json(course);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du cours:", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du cours" });
  }
};

exports.deleteCourse = async (req, res) => {
  const courseId = req.params.id;
  if (!courseId) {
    return res.status(400).json({ error: "Course ID is required." });
  }
  try {
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    }
    await course.destroy();
    res.status(204).end();
  } catch (error) {
    console.error("Erreur lors de la suppression du cours:", error);
    res.status(500).json({ error: "Erreur lors de la suppression du cours" });
  }
};

exports.getCourseById = async (req, res) => {
  const courseId = req.params.id;
  if (!courseId) {
    return res.status(400).json({ error: "Course ID is required." });
  }
  try {
    const course = await Course.findByPk(courseId, fullCourse);

    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error("Erreur lors de la récupération du cours:", error);
    res.status(500).json({ error: "Erreur lors de la récupération du cours" });
  }
};
