// components/PetCard.js
import React, { useState } from 'react';
import { Edit, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const PetCard = ({ pet, onAdopt, onEdit }) => {
  const [isAdopting, setIsAdopting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleEditClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (typeof onEdit !== 'function') {
      console.error('onEdit prop is not a function');
      alert('Edit functionality is not available');
      return;
    }

    setIsEditing(true);
    try {
      console.log('Attempting to edit pet:', pet.id);
      await onEdit(pet);
      alert(`${pet.name}'s details updated successfully!`);
    } catch (error) {
      console.error('Edit failed:', error);
      alert(`Failed to edit pet: ${error.message}`);
    } finally {
      setIsEditing(false);
    }
  };

  const handleAdoptClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (typeof onAdopt !== 'function') {
      console.error('onAdopt prop is not a function');
      alert('Adoption functionality is not available');
      return;
    }

    setIsAdopting(true);
    try {
      console.log('Attempting to adopt pet:', pet.id);
      await onAdopt(pet);
      alert(`${pet.name} has been adopted! 🎉`);
    } catch (error) {
      console.error('Adoption failed:', error);
      alert(`Failed to adopt pet: ${error.message}`);
    } finally {
      setIsAdopting(false);
    }
  };

  const getSpeciesEmoji = () => {
    switch (pet.species) {
      case 'Dog': return '🐕';
      case 'Cat': return '🐈';
      case 'Bird': return '🐦';
      case 'Rabbit': return '🐇';
      default: return '🐾';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <div className={`w-full flex flex-col sm:flex-row rounded-xl overflow-hidden shadow-md ${isHovered ? 'shadow-lg' : 'shadow-md'} ${pet.adopted ? 'bg-gray-50' : 'bg-white'} transition-all duration-300`}>
        <div className="w-full sm:w-1/3 h-48 bg-gradient-to-b from-blue-50 to-purple-50 flex items-center justify-center">
          <span className="text-5xl">{getSpeciesEmoji()}</span>
        </div>
        <div className="w-full sm:w-2/3 p-5 flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-500 mr-2">{pet.species}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  pet.mood === 'Happy' ? 'bg-green-100 text-green-800' :
                  pet.mood === 'Playful' ? 'bg-blue-100 text-blue-800' :
                  pet.mood === 'Calm' ? 'bg-indigo-100 text-indigo-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {pet.mood}
                </span>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              pet.adopted ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
            }`}>
              {pet.adopted ? 'Adopted' : 'Available'}
            </span>
          </div>

          <div className="space-y-3 mb-4 flex-grow">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-600">{pet.age} {pet.age === 1 ? 'year' : 'years'} old</span>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-gray-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-gray-600">{pet.personality}</span>
            </div>
          </div>

          <div className="flex space-x-3 mt-auto">
            <button 
              onClick={handleEditClick}
              disabled={isEditing || pet.adopted}
              className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
              data-testid="edit-button"
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? 'Editing...' : 'Edit'}
            </button>
            {!pet.adopted && (
              <button 
                onClick={handleAdoptClick}
                disabled={isAdopting}
                className="flex-1 flex items-center justify-center py-2 px-4 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition disabled:opacity-50"
                data-testid="adopt-button"
              >
                <Heart className={`w-4 h-4 mr-2 ${isAdopting ? '' : 'animate-pulse'}`} />
                {isAdopting ? 'Adopting...' : 'Adopt'}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

PetCard.propTypes = {
  pet: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    mood: PropTypes.string.isRequired,
    personality: PropTypes.string.isRequired,
    adopted: PropTypes.bool.isRequired
  }).isRequired,
  onAdopt: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default PetCard;
