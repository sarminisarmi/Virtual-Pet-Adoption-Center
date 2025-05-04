import React from 'react';
import PetCard from '../components/ PetCard';

const PetList = ({ pets, onAdopt, onEdit }) => {
  return (
    <div className="pet-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {pets.map((pet) => (
        <PetCard
          key={pet._id}
          pet={pet}
          onAdopt={() => onAdopt(pet._id)}    
          onEdit={() => onEdit(pet)}            
        />
      ))}
    </div>
  );
};

export default PetList;
