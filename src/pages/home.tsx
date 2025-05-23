import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header existant */}
      
      <main className="flex-grow flex flex-col items-center justify-center bg-gray-50 p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Bienvenue sur MonSite</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {/* Bouton Personnel */}
          <button
            onClick={() => navigate("/personnel")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-lg shadow-md transition transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold mb-2">👨‍💼 Personnel</h2>
            <p className="text-sm">Accès aux outils de gestion interne</p>
          </button>

          {/* Bouton Agents de ramassage */}
          <button
            onClick={() => navigate("/agents")}
            className="bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-lg shadow-md transition transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold mb-2">🚛 Agents de Ramassage</h2>
            <p className="text-sm">Interface de suivi des collectes</p>
          </button>

          {/* Bouton Citoyens */}
          <button
            onClick={() => navigate("/citoyens")}
            className="bg-purple-500 hover:bg-purple-600 text-white py-4 px-6 rounded-lg shadow-md transition transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold mb-2">👥 Citoyens</h2>
            <p className="text-sm">Services publics et informations</p>
          </button>
        </div>
      </main>

      {/* Footer existant */}
    </div>
  );
};

export default HomePage;