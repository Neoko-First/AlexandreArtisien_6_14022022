// importe le module de hashage et salage des mdp 
const bcrypt = require("bcrypt");

// importe le module de création de token
const jwt = require("jsonwebtoken");

// importe express-validator, middleware de validation des entrées pour contrer l'injection SQL
const { body, validationResult } = require("express-validator");

// importation du modèle de donnée d'un user
const User = require("../models/User");

// Appel de .env pour utiliser les variables d'environnement (npm install dotenv --save)
require("dotenv").config();

// Expression régulière permettant de contrôler les entrés via le front
const RegExpEmail =
  /^(([^<()[\]\\.,;:\s@\]+(\.[^<()[\]\\.,;:\s@\]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

// controlleur d'inscription d'un utilisateur
exports.signup = (req, res, next) => {
  // verrifie que l'email (mot de passe hashé donc pas besoin)
  if (body("email").isEmail()) {
    // utilise bcrypt pour crée un hash du mot de passe tranmis
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        // crée un objet user
        const user = new User({
          email: req.body.email,
          password: hash,
        });
        // enregistre le nouveau user
        user
          .save()
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    res.status(400).json({ error: "email incohérent" });
  }
};

// controlleur de connexion d'un utilisateur
exports.login = (req, res, next) => {
  // verrifie que l'email (mot de passe hashé donc pas besoin)
  if (body("email").isEmail()) {
    // recherche l'adresse mail dans la BDD
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }
        // génère un hash du mdp et le compare à celui associé à l'adresse mail dans la BDD
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ error: "Mot de passe incorrect !" });
            }
            // renvoi le userId et un token généré par jwt (contenant l'id et expire dans 24h)
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                process.env.SECRET_CRYPT_TOKEN,
                { expiresIn: "24h" }
              ),
            });
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    res.status(400).json({ error: "email incohérent" });
  }
};
