const { User } = require("../../models");
const { LogError, LogSuccess } = require("../../services/console");

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
