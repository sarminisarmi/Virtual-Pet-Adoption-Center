const petService = require('../services/petService');

exports.addPet = async (req, res) => {
    try {
        const pet = await petService.createPet(req.body);
        res.status(201).json(pet);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllPets = async (req, res) => {
    try {
        const pets = await petService.getAllPets();
        res.json(pets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPetById = async (req, res) => {
    try {
        const pet = await petService.getPetById(req.params.id);
        if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
        }
        res.json(pet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePet = async (req, res) => {
    try {
        const pet = await petService.updatePet(req.params.id, req.body);
        if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
        }
        res.json(pet);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.adoptPet = async (req, res) => {
    try {
        const pet = await petService.adoptPet(req.params.id);
        if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
        }
        res.json(pet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePet = async (req, res) => {
    try {
        const result = await petService.deletePet(req.params.id);
        if (!result) {
            return res.status(404).json({ error: 'Pet not found' });
        }
        res.json({ message: 'Pet deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.filterPetsByMood = async (req, res) => {
    try {
        const mood = req.query.mood;
        const pets = await petService.filterPetsByMood(mood);
        res.json(pets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
