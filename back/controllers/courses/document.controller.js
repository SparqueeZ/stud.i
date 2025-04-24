const Course = require("../../models/Course");
const Chapter = require("../../models/Chapter");
const Lesson = require("../../models/Lesson");
const Document = require("../../models/Document");
const Content = require("../../models/Content");
const { where } = require("sequelize");

exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.findAll();
    res.status(200).json(documents);
  } catch (error) {
    console.error("Erreur lors de la récupération des documents:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des documents" });
  }
};

exports.getAllDocumentsByCourseId = async (req, res) => {
  const courseId = req.params.courseId;
  if (!courseId) {
    return res.status(400).json({ error: "Course ID is required." });
  }
  try {
    const documents = await Document.findAll({
      include: [
        {
          model: Lesson,
          include: [
            {
              model: Chapter,
              where: { courseId },
            },
          ],
        },
      ],
    });
    res.status(200).json(documents);
  } catch (error) {
    console.error("Erreur lors de la récupération des documents:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des documents" });
  }
};

exports.getAllDocumentsByChapterId = async (req, res) => {
  const chapterId = req.params.chapterId;
  if (!chapterId) {
    return res.status(400).json({ error: "Chapter ID is required." });
  }
  try {
    const documents = await Document.findAll({
      include: [
        {
          model: Lesson,
          where: { chapterId },
        },
      ],
    });
    res.status(200).json(documents);
  } catch (error) {
    console.error("Erreur lors de la récupération des documents:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des documents" });
  }
};

exports.getAllDocumentsByLessonId = async (req, res) => {
  const lessonId = req.params.lessonId;
  if (!lessonId) {
    return res.status(400).json({ error: "Lesson ID is required." });
  }
  try {
    const documents = await Document.findAll({
      where: { lessonId },
    });
    res.status(200).json(documents);
  } catch (error) {
    console.error("Erreur lors de la récupération des documents:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des documents" });
  }
};

exports.createDocument = async (req, res) => {
  try {
    const document = await Document.create(req.body);
    res.status(201).json(document);
  } catch (error) {
    console.error("Erreur lors de la création du document:", error);
    res.status(500).json({ error: "Erreur lors de la création du document" });
  }
};

exports.getDocumentById = async (req, res) => {
  const documentId = req.params.id;
  if (!documentId) {
    return res.status(400).json({ error: "Document ID is required." });
  }
  try {
    const document = await Document.findByPk(documentId);
    if (!document) {
      return res.status(404).json({ error: "Document not found." });
    }
    res.status(200).json(document);
  } catch (error) {
    console.error("Erreur lors de la récupération du document:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération du document" });
  }
};

exports.updateDocument = async (req, res) => {
  const documentId = req.params.id;
  if (!documentId) {
    return res.status(400).json({ error: "Document ID is required." });
  }
  try {
    const document = await Document.findByPk(documentId);
    if (!document) {
      return res.status(404).json({ error: "Document not found." });
    }
    await document.update(req.body);
    res.status(200).json(document);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du document:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour du document" });
  }
};

exports.deleteDocument = async (req, res) => {
  const documentId = req.params.id;
  if (!documentId) {
    return res.status(400).json({ error: "Document ID is required." });
  }
  try {
    const document = await Document.findByPk(documentId);
    if (!document) {
      return res.status(404).json({ error: "Document not found." });
    }
    await document.destroy();
    res.status(204).end();
  } catch (error) {
    console.error("Erreur lors de la suppression du document:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression du document" });
  }
};
