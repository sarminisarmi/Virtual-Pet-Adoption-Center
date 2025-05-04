import axios from 'axios';

const API_URL = 'http://localhost:5000/api/pets';

export const getAllPets = () => axios.get(API_URL);
export const addPet = (petData) => axios.post(API_URL, petData);
export const adoptPet = (id) => axios.patch(`${API_URL}/${id}/adopt`);
export const filterPetsByMood = (mood) => {
  if (mood === 'all') return getAllPets();
  return axios.get(`${API_URL}?mood=${mood}`);
};
