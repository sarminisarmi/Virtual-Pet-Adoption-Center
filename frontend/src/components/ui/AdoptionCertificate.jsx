export default function AdoptionCertificate({ pet, onClose }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-primary">Adoption Certificate</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              &times;
            </button>
          </div>
          
          <div className="border-2 border-primary p-8 text-center">
            <h3 className="text-3xl font-bold mb-6 text-secondary">Certificate of Adoption</h3>
            
            <p className="text-lg mb-8">This certifies that <span className="font-bold text-xl">{pet.name}</span></p>
            
            <p className="text-lg mb-2">A {pet.age}-year-old {pet.species.toLowerCase()}</p>
            <p className="text-lg mb-8">with a {pet.personality.toLowerCase()} personality</p>
            
            <p className="text-lg mb-8">has been officially adopted into a loving forever home.</p>
            
            <div className="mt-12 inline-block">
              <div className="border-t-2 border-black w-48 mx-auto"></div>
              <p className="mt-2">Signature</p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }