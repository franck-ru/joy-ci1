import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8 mt-auto">
      <div className="container mx-auto px-4">
        {/* Bloc d'informations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Colonne 1 : Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <p className="text-gray-600">email@example.com</p>
            <p className="text-gray-600">+123 456 789</p>
          </div>

          {/* Colonne 2 : Adresse */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Adresse</h3>
            <p className="text-gray-600">123 Rue Example</p>
            <p className="text-gray-600">Paris, France</p>
          </div>

          {/* Colonne 3 : Horaires */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Horaires</h3>
            <p className="text-gray-600">Lun-Ven : 9h-18h</p>
            <p className="text-gray-600">Sam : 10h-14h</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 pt-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} JOY-CI. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;