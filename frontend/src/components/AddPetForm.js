import React, { useState } from 'react';
import { addPet } from '../services/api';

const AddPetForm = ({ onPetAdded }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ 
    name: '', 
    species: '', 
    age: '0', 
    personality: '' 
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPet(form);
    setForm({ name: '', species: '', age: '0', personality: '' });
    setStep(1);
    onPetAdded();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Pet</h1>
      
      {/* Progress indicator */}
      <div className="flex mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex-1 flex items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center 
                ${step >= i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              {i}
            </div>
            {i < 3 && (
              <div className={`flex-1 h-1 mx-2 ${step > i ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Pet Name */}
      {step === 1 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            What's your pet's name?
          </h2>
          <p className="text-gray-500 mb-4">
            Give your pet a name that suits their personality.
          </p>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Buddy, Whiskers, Rex"
              required
            />
          </div>
          
          <button
            onClick={nextStep}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Next
          </button>
        </div>
      )}

      {/* Step 2: Pet Species and Age */}
      {step === 2 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            What type of pet is {form.name || 'your pet'}?
          </h2>
          <p className="text-gray-500 mb-4">
            Select the species and age of your pet.
          </p>
          
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-700 mb-3">Species</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Dog', 'Cat', 'Bird', 'Rabbit', 'Hamster', 'Other'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setForm({...form, species: type})}
                  className={`py-2 px-4 rounded-md border ${form.species === type 
                    ? 'bg-blue-100 border-blue-500 text-blue-700' 
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Age (years)</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              min="0"
              max="30"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={prevStep}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition"
            >
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              disabled={!form.species}
              className={`flex-1 py-2 px-4 rounded-md transition ${!form.species 
                ? 'bg-blue-300 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Pet Personality */}
      {step === 3 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            What's {form.name || 'your pet'}'s personality like?
          </h2>
          <p className="text-gray-500 mb-4">
            Describe your pet's personality traits.
          </p>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Personality</label>
            <textarea
              name="personality"
              value={form.personality}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Friendly, Playful, Shy"
              required
            />
          </div>
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={prevStep}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition"
            >
              Back
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
            >
              Add Pet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPetForm;