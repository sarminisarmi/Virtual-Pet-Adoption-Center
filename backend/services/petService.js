const Pet = require('../models/petModel');
const { getMood } = require('../utils/moodLogic');

const mapMoodToPets = (pets) => {
    return pets.map(pet => {
        const petObj = pet.toObject();
        petObj.mood = getMood(pet.createdAt);
        return petObj;
    });
};

exports.createPet = async (petData) => {
    const pet = new Pet(petData);
    await pet.save();
    const petObj = pet.toObject();
    petObj.mood = getMood(pet.createdAt);
    return petObj;
};

exports.getAllPets = async () => {
    const pets = await Pet.find();
    return mapMoodToPets(pets);
};

exports.getPetById = async (id) => {
    const pet = await Pet.findById(id);
    if (!pet) return null;
    const petObj = pet.toObject();
    petObj.mood = getMood(pet.createdAt);
    return petObj;
};

exports.updatePet = async (id, updateData) => {
    const pet = await Pet.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!pet) return null;
    const petObj = pet.toObject();
    petObj.mood = getMood(pet.createdAt);
    return petObj;
};

exports.adoptPet = async (id) => {
    const pet = await Pet.findByIdAndUpdate(
        id,
        { adopted: true, adoption_date: new Date() },
        { new: true, runValidators: true }
    );
    if (!pet) return null;
    const petObj = pet.toObject();
    petObj.mood = getMood(pet.createdAt);
    return petObj;
};

exports.deletePet = async (id) => {
    const pet = await Pet.findByIdAndDelete(id);
    return !!pet;
};

exports.filterPetsByMood = async (mood) => {
    const pets = await Pet.find();
    // Filter pets with matching mood dynamically calculated.
    return pets
        .map(pet => {
            const petObj = pet.toObject();
            petObj.mood = getMood(pet.createdAt);
            return petObj;
        })
        .filter(pet => pet.mood === mood);
};
