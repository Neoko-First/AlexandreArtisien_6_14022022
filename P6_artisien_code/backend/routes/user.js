// On a besoin d'Express
const express = require("express");

// On crée un router avec la méthode mise à disposition par Express
const router = express.Router();

// importe le controleur associé
const userCtrl = require("../controllers/user");

// importe le middleware password-validator de verrification de force de mdp
const passVal = require("../middleware/password-validator")

// Middleware d'inscription
router.post("/signup", passVal, userCtrl.signup);

// Middleware de connexion
router.post("/login", userCtrl.login);

module.exports = router;
