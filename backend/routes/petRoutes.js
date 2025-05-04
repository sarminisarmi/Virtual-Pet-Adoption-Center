const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

router.post('/pets', petController.addPet);
router.get('/pets', petController.getAllPets);
router.get('/pets/filter', petController.filterPetsByMood);
router.get('/pets/:id', petController.getPetById);
router.put('/pets/:id', petController.updatePet);
router.patch('/pets/:id/adopt', petController.adoptPet);
router.delete('/pets/:id', petController.deletePet);

module.exports = router;
