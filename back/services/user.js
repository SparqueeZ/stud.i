const User = require("../models/User/User.js");

const checkInputs = (firstname, lastname, email, password) => {
  // check if firstname and lastname are not empty/null and are strings without special characters and numbers
  const textRegex = /^[a-zA-ZÀ-ÿ\s-]+$/;
  if (!firstname || !lastname) {
    return { error: "Nom ou prénom manquant", code: 400 };
  }
  if (firstname.length < 2 || lastname.length < 2) {
    return { error: "Nom ou prénom trop court", code: 490 };
  }
  if (!textRegex.test(firstname) || !textRegex.test(lastname)) {
    return { error: "Nom ou prénom invalide", code: 491 };
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email)) {
    return { error: "Email invalide", code: 492 };
  }
  if (email.length < 5) {
    return { error: "Email trop court", code: 493 };
  }
  if (email.length > 50) {
    return { error: "Email trop long", code: 494 };
  }

  //   const passwordRegex =
  //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //   if (!password || !passwordRegex.test(password)) {
  //     return { error: "Mot de passe invalide", code: 495 };
  //   }
  //   if (password.length < 8) {
  //     return { error: "Mot de passe trop court", code: 496 };
  //   }

  return true;
};

const checkString = (str) => {
  const textRegex = /^[a-zA-ZÀ-ÿ\s-]+$/;
  if (!str) {
    return { error: "Chaine de caractères manquante", code: 400 };
  }
  if (str.length < 2) {
    return { error: "Chaine de caractères trop courte", code: 490 };
  }
  if (!textRegex.test(str)) {
    return { error: "Chaine de caractères invalide", code: 491 };
  }
  return true;
};

const checkEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email)) {
    return { error: "Format du mail invalide", code: 492 };
  }
  if (email.length < 5) {
    return { error: "Email trop court", code: 493 };
  }
  if (email.length > 50) {
    return { error: "Email trop long", code: 494 };
  }
  return true;
};

const checkPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  //   if (!password || !passwordRegex.test(password)) {
  //     return { error: "Mot de passe invalide", code: 495 };
  //   }
  //   if (password.length < 8) {
  //     return { error: "Mot de passe trop court", code: 496 };
  //   }
  return true;
};

const updateLastConnection = async (userId) => {
  console.log("userId", userId);
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return { error: "Utilisateur non trouvé", code: 404 };
    }
    user.lastConnectedAt = new Date();
    await user.save();
    return true;
  } catch (error) {
    console.error("Erreur updateLastConnection :", error); // Log d'erreur détaillé
    return {
      error: "Erreur lors de la mise à jour de la dernière connexion",
      code: 500,
    };
  }
};

module.exports = {
  checkInputs,
  checkString,
  checkEmail,
  checkPassword,
  updateLastConnection,
};
