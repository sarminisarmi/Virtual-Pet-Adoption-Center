import React, { useState, useEffect } from 'react';
import PetList from '../components/PetList';
import AddPetForm from '../components/AddPetForm';
import { filterPetsByMood, getAllPets, adoptPet } from '../services/api';
import { PawPrint } from 'lucide-react'; 
const HomePage = () => {
  const [pets, setPets] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPets = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAllPets();
      setPets(res.data);
    } catch (err) {
      setError('Failed to fetch pets. Please try again.');
      console.error('Error fetching pets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (mood) => {
    try {
      setLoading(true);
      const res = mood ? await filterPetsByMood(mood) : await getAllPets();
      setPets(res.data);
    } catch (err) {
      setError('Failed to filter pets. Please try again.');
      console.error('Error filtering pets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdopt = async (id) => {
    try {
      await adoptPet(id);
      await fetchPets(); // Refresh the list after adoption
    } catch (err) {
      setError('Failed to adopt pet. Please try again.');
      console.error('Error adopting pet:', err);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPets = pets.filter(pet => 
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.species.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchPets();
  }, []);

   return (
    
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <PawPrint className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-center text-purple-800">Pet Adoption Center</h1>
          </div>
          <p className="text-center text-gray-600 max-w-2xl">
            Find your perfect furry, feathery, or scaly companion! Browse our available pets and give them a loving
            home.
          </p>
        </div>
      {/* Main Content */}
      <main className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Set Adoption Center</h3>
        
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search pets..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex space-x-2">
            <select
              onChange={(e) => handleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="">Filter by Mood</option>
              <option value="Happy">Happy</option>
              <option value="Playful">Playful</option>
              <option value="Calm">Calm</option>
            </select>
            <button
              onClick={fetchPets}
              disabled={loading}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
            >
              Add Pets...
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Pet List */}
        {!loading && <PetList pets={filteredPets} onAdopt={handleAdopt} />}

        {/* Add Pet Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New Pet</h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <AddPetForm 
                onPetAdded={() => {
                  fetchPets();
                  setShowAddForm(false);
                }} 
              />
            </div>
          </div>
        )}
        
      </main>

      
    </div>
  );
};

export default HomePage;