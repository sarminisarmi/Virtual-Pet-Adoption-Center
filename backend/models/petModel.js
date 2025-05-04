const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    species: { type: String, required: true },
    age: { type: Number, required: true },
    personality: { type: String, required: true },
    adopted: { type: Boolean, default: false },
    adoption_date: { type: Date, default: null },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

module.exports = mongoose.model('Pet', petSchema);
