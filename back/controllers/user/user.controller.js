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
