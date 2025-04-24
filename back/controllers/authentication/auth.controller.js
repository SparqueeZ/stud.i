const { User } = require("../../models");
const { checkInputs } = require("../../services/user");
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

    if (!firstname || !lastname || !email || !password) {
      LogError("authentication : Champs manquants");
      return res.status(400).json({ error: "Champs manquants" });
    }

    const emailAlreadyTaken = await checkIfEmailAlreadyTaken(email, res);
    if (emailAlreadyTaken) {
      LogError("authentication : Email déjà utilisé");
      return res.status(409).json({ error: "Email déjà utilisé" });
    }

    const inputsValid = checkInputs(firstname, lastname, email, password);
    if (inputsValid !== true) {
      LogError(
        "authentication : Erreur dans les données d'inscription :",
        inputsValid.error
      );
      return res
        .status(400)
        .json({ code: inputsValid.code, error: inputsValid.error });
    }

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password,
    });

    const userData = {
      id: newUser.id,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
      role: newUser.role,
    };

    LogSuccess("authentication : Utilisateur enregistré avec succès", newUser);
    res.status(201).json(userData);
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

    const userData = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    };

    const token = user.generateAuthToken();
    res.cookie("sessionToken", token, { httpOnly: false, secure: false });
    res.status(200).json({ message: "Connexion réussie", user: userData });
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
