const { User } = require("../../models");
const { LogError, LogSuccess } = require("../../services/console");
const { Course, UserCourse } = require("../../models"); // Ajout de Course et UserCourse

exports.getUserData = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      LogError("authentication : Utilisateur non trouvé");
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    LogSuccess("authentication : Données utilisateur récupérées avec succès");
    res.status(200).json(user);
  } catch (error) {
    LogError(
      "authentication : Erreur lors de la récupération des données utilisateur",
      error
    );
    res.status(500).json({
      error: "Erreur lors de la récupération des données utilisateur",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    LogSuccess("authentication : Tous les utilisateurs récupérés avec succès");
    res.status(200).json(users);
  } catch (error) {
    LogError(
      "authentication : Erreur lors de la récupération des utilisateurs",
      error
    );
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      LogError("authentication : Utilisateur non trouvé");
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    await user.destroy();
    LogSuccess("authentication : Utilisateur supprimé avec succès", userId);
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    LogError(
      "authentication : Erreur lors de la suppression de l'utilisateur",
      error
    );
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de l'utilisateur" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstname, lastname, email, role } = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      LogError("authentication : Utilisateur non trouvé");
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    await user.update({ firstname, lastname, email, role });
    LogSuccess("authentication : Utilisateur mis à jour avec succès", userId);
    res.status(200).json(user);
  } catch (error) {
    LogError(
      "authentication : Erreur lors de la mise à jour de l'utilisateur",
      error
    );
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de l'utilisateur" });
  }
};

exports.assignCourseToUser = async (req, res) => {
  try {
    const { courseId, userId } = req.body;
    console.log("userId", userId);
    console.log("courseId", courseId);
    if (!userId || !courseId) {
      return res.status(400).json({ error: "userId et courseId sont requis" });
    }

    // Vérifier que l'utilisateur et la course existent
    const user = await User.findByPk(userId);
    const course = await Course.findByPk(courseId);
    if (!user || !course) {
      return res
        .status(404)
        .json({ error: "Utilisateur ou course non trouvé" });
    }

    // Créer l'association (ou la retrouver si elle existe déjà)
    const [userCourse, created] = await UserCourse.findOrCreate({
      where: { userId, courseId },
      defaults: { userId, courseId },
    });

    if (!created) {
      return res
        .status(409)
        .json({ error: "L'utilisateur a déjà cette course" });
    }

    LogSuccess("Course assignée à l'utilisateur avec succès", {
      userId,
      courseId,
    });
    res.status(201).json({
      message: "Course assignée à l'utilisateur avec succès",
      userCourse,
    });
  } catch (error) {
    LogError(
      "Erreur lors de l'attribution de la course à l'utilisateur",
      error
    );
    res.status(500).json({
      error: "Erreur lors de l'attribution de la course à l'utilisateur",
    });
  }
};
