const { User } = require("../../models");
const {
  checkInputs,
  checkEmail,
  checkPassword,
} = require("../../services/user");
const { LogError, LogSuccess } = require("../../services/console");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
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

    const emailValid = checkEmail(email);
    if (emailValid !== true) {
      return res.status(400).json(emailValid);
    }

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

exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const emailValid = checkEmail(email);
    if (emailValid !== true) {
      return res.status(400).json(emailValid);
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      LogError("authentication : Utilisateur non trouvé", email);
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const resetToken = await user.generateResetToken();
    await user.save();

    await sendResetEmail(user, resetToken);

    LogSuccess("authentication : Email de réinitialisation envoyé", email);
    res.status(200).json({ message: "Email de réinitialisation envoyé" });
  } catch (error) {
    LogError(
      "authentication : Erreur lors de la demande de réinitialisation du mot de passe",
      error
    );
    res.status(500).json({
      error: "Erreur lors de la demande de réinitialisation du mot de passe",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const passwordValid = checkPassword(password);
    if (passwordValid !== true) {
      return res.status(400).json(passwordValid);
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    const user = await User.findByPk(userId);
    if (!user) {
      LogError("authentication : Utilisateur non trouvé", userId);
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    if (user.resetTokenUsed) {
      LogError("authentication : Token déjà utilisé", userId);
      return res
        .status(400)
        .json({ error: "La demande de changement de mot de passe a expiré." });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    user.password = hashedPassword;
    user.resetTokenUsed = true;
    await user.save();

    LogSuccess(
      "authentication : Mot de passe réinitialisé avec succès",
      userId
    );
    res.status(200).json({ message: "Mot de passe réinitialisé avec succès" });
  } catch (error) {
    LogError(
      "authentication : Erreur lors de la réinitialisation du mot de passe",
      error
    );
    res
      .status(500)
      .json({ error: "Erreur lors de la réinitialisation du mot de passe" });
  }
};

const checkIfEmailAlreadyTaken = async (email, res) => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    return true;
  }
  return false;
};

const sendResetEmail = async (user, resetToken) => {
  try {
    const confirmationLink = `${process.env.FRONT_URL}/password-reset?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Demande de réinitialisation de mot de passe",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <div style="background-color: #161618; color: #ffffff; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">Réinitialisation de mot de passe</h1>
            </div>
            <div style="padding: 20px; color: #333333;">
              <p>Bonjour ${user.firstname},</p>
              <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous pour procéder :</p>
              <div style="text-align: center; margin: 20px 0;">
                <a href="${confirmationLink}" style="background-color: #FFD700; color: #161618; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold; display: inline-block;">Réinitialiser mon mot de passe</a>
              </div>
              <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>
              <p>Merci,</p>
              <p>L'équipe de votre application</p>
            </div>
            <div style="background-color: #f4f4f4; color: #888888; padding: 10px; text-align: center; font-size: 12px;">
              <p>© ${new Date().getFullYear()} Votre Application. Tous droits réservés.</p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    LogSuccess("authentication : Email de réinitialisation envoyé", user.email);
  } catch (error) {
    LogError(
      "authentication : Erreur lors de l'envoi de l'email de réinitialisation",
      error
    );
    throw new Error("Erreur lors de l'envoi de l'email de réinitialisation");
  }
};
