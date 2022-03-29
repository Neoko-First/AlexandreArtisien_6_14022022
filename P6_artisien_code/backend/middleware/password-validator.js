// Importe le plugin "password-validator" qui permet d'appliquer plusieurs filtres/règles sur la création de mots de passe (npm install password-validator)
var passwordValidator = require("password-validator");

// Crée un nouveau schéma 
var schema = new passwordValidator();

module.exports = (req, res, next) => {
  // Add properties to it
  schema
    .is()
    .min(8) // Minimum 8 caractères
    .is()
    .max(100) // Maximum 100 caractères
    .has()
    .uppercase() // Doit contenir des majuscules
    .has()
    .lowercase() // Doit contenir des minuscules
    .has()
    .digits(2) // Doit contenir au moins 2 chiffres
    .has()
    .not()
    .spaces() // Ne doit pas comporter d'espaces
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]); // Blacklist de certains mot de passe 

  // schema.validate(req.body.password) :
  // renvoi TRUE si le mot de passe resepcte toutes les règles 
  // renvoi FALSE sinon

  // Si TRUE
  if (schema.validate(req.body.password)) {
    // permission accordée
    next();
  } else {
    res.status(401).json({
      error:
        "Mot de passe trop faible !" + schema.validate("joke", { list: true }),
    });
  }
};
