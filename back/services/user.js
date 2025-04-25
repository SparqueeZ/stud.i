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

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password || !passwordRegex.test(password)) {
    return { error: "Mot de passe invalide", code: 495 };
  }
  if (password.length < 8) {
    return { error: "Mot de passe trop court", code: 496 };
  }

  return true;
};

module.exports = {
  checkInputs,
};
