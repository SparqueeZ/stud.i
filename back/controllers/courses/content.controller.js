const Course = require("../../models/Course");
const Chapter = require("../../models/Chapter");
const Lesson = require("../../models/Lesson");
const Content = require("../../models/Content");
const { checkIfLessonExists } = require("../../services/checks");

exports.getAllContents = async (req, res) => {
  try {
    const contents = await Content.findAll();
    res.status(200).json(contents);
  } catch (error) {
    console.error(`[WARN] Error retrieving all contents`);
    res.status(500).json({
      message: "Erreur lors de la récupération des contenus.",
      error,
    });
  }
};

exports.getAllContentsByCourseId = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    // Récupérer le cours avec ses chapitres, leurs leçons et leurs contenus
    const course = await Course.findByPk(courseId, {
      include: [
        {
          model: Chapter,
          include: [
            {
              model: Lesson,
              include: [Content],
            },
          ],
        },
      ],
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    const errorMessage = `[WARN] Erreur lors de la récupération des contenus par l'id de cours ${courseId}`;
    console.error(errorMessage, error);
    res.status(500).json({ message: errorMessage, error });
  }
};

exports.getAllContentsByChapterId = async (req, res) => {
  const chapterId = req.params.chapterId;
  if (!chapterId) {
    return res.status(400).json({ error: "Chapter ID is required." });
  }

  try {
    const lessons = await Lesson.findAll({
      where: { chapterId },
      include: [
        {
          model: Content,
          attributes: [
            "id",
            "textType",
            "textContent",
            "noteIcon",
            "noteColor",
            "parentId",
            "createdAt",
            "updatedAt",
          ],
        },
      ],
    });

    res.status(200).json(lessons);
  } catch (error) {
    console.error("Erreur lors de la récupération des contents:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des contents" });
  }
};

exports.getAllContentsByLessonId = async (req, res) => {
  const lessonId = req.params.lessonId;
  if (!lessonId) {
    return res.status(400).json({ error: "Lesson ID is required." });
  }
  try {
    // Récupérer la leçon avec ses contenus
    const lesson = await Lesson.findByPk(lessonId, {
      include: [
        {
          model: Content,
          attributes: [
            "id",
            "textType",
            "textContent",
            "noteIcon",
            "noteColor",
            "parentId",
            "createdAt",
            "updatedAt",
          ],
        },
      ],
    });

    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found." });
    }

    res.status(200).json(lesson);
  } catch (error) {
    console.error("Erreur lors de la récupération des contents:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des contents" });
  }
};

exports.createContent = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const lesson = await checkIfLessonExists(lessonId);
    if (!lesson) {
      res.status(404).json({ error: "Lesson not found." });
      return;
    } else {
      const contentData = {
        ...req.body,
        lessonId: lessonId,
      };

      const content = await Content.create(contentData);
      res.status(201).json(content);
    }
  } catch (error) {
    console.error("Erreur lors de la création du contenu:", error);
    res.status(500).json({ error: "Erreur lors de la création du contenu" });
  }
};

exports.getContentById = async (req, res) => {
  const contentId = req.params.id;
  if (!contentId) {
    return res.status(400).json({ error: "Content ID is required." });
  }
  try {
    const content = await Content.findByPk(contentId);
    if (!content) {
      return res.status(404).json({ error: "Content not found." });
    }
    res.status(200).json(content);
  } catch (error) {
    console.error("Erreur lors de la récupération du content:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération du content" });
  }
};

exports.updateContent = async (req, res) => {
  const contentId = req.params.id;
  if (!contentId) {
    return res.status(400).json({ error: "Content ID is required." });
  }
  try {
    const content = await Content.findByPk(contentId);
    if (!content) {
      return res.status(404).json({ error: "Content not found." });
    }
    await content.update(req.body);
    res.status(200).json(content);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du content:", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du content" });
  }
};

exports.deleteContent = async (req, res) => {
  const contentId = req.params.id;
  if (!contentId) {
    return res.status(400).json({ error: "Content ID is required." });
  }
  try {
    const content = await Content.findByPk(contentId);
    if (!content) {
      return res.status(404).json({ error: "Content not found." });
    }
    await content.destroy();
    res.status(204).json({ message: "Content deleted successfully." });
  } catch (error) {
    console.error("Erreur lors de la suppression du content:", error);
    res.status(500).json({ error: "Erreur lors de la suppression du content" });
  }
};
