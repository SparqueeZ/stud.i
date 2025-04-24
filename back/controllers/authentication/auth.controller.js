const { User } = require("../../models");
const { LogError, LogSuccess } = require("../../services/console");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
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

exports.createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const newUser = await User.create({ firstname, lastname, email, password });
    LogSuccess("authentication : Utilisateur créé avec succès", newUser);
    res.status(201).json(newUser);
  } catch (error) {
    LogError(
      "authentication : Erreur lors de la création de l'utilisateur",
      JSON.stringify(error)
    );
    res
      .status(500)
      .json({ error: "Erreur lors de la création de l'utilisateur" });
  }
};

exports.register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const emailAlreadyTaken = await checkIfEmailAlreadyTaken(email, res);
    if (emailAlreadyTaken) {
      LogError("authentication : Email déjà utilisé");
      return res.status(409).json({ error: "Email déjà utilisé" });
    }

    const newUser = await User.create({ firstname, lastname, email, password });

    LogSuccess("authentication : Utilisateur enregistré avec succès", newUser);
    res.status(201).json(newUser);
  } catch (error) {
    LogError(
      "authentication : Erreur lors de l'enregistrement de l'utilisateur",
      error
    );
    res
      .status(500)
      .json({ error: "Erreur lors de l'enregistrement de l'utilisateur" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      LogError("authentication : Utilisateur non trouvé", email);
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    const isPasswordValid = await user.isValidPassword(password);
    if (!isPasswordValid) {
      LogError("authentication : Mot de passe invalide", email);
      return res.status(401).json({ error: "Mot de passe invalide" });
    }
    LogSuccess("authentication : Connexion réussie");

    const token = user.generateAuthToken();
    res.cookie("sessionToken", token, { httpOnly: false, secure: false });
    res.status(200).json({ message: "Connexion réussie" });
  } catch (error) {
    LogError("authentication : Erreur lors de la connexion", error);
    res.status(500).json({ error: "Erreur lors de la connexion" });
  }
};

const checkIfEmailAlreadyTaken = async (email, res) => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    return true;
  }
  return false;
};
