// importe express
const express = require("express");

// On crée un router avec la méthode mise à disposition par Express
const router = express.Router();

// importe le controleur associé
const sauceCtrl = require("../controllers/sauce");

// importe notre middleware de verification du token 
const auth = require("../middleware/auth");

// importe notre middleware de désinfection des entrés
const sanitizor = require("../middleware/sanitizor-sauce");

// importe le middleware multer de contrôle des fichiers images
const multer = require("../middleware/multer-config")

// ajout de auth sur chaque route associées aux sauces
// ajout de multer (attention à ajouter multer après auth)
// Renvoie un tableau de toutes les sauces de la base de données
router.get('/', auth, sauceCtrl.getAllSauce);

// Renvoie la sauce avec l’_id fourni
router.get('/:id', auth, sauceCtrl.getOneSauce);

// Ajout d'une nouvelle sauce
router.post('/', auth, multer, sanitizor, sauceCtrl.createSauce);

// Modifie/met à jour une sauce
router.put('/:id', auth, multer, sanitizor, sauceCtrl.modifySauce);

// Supprime une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);

// Définit le statut « Like » pour le userId fourni
router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router;
