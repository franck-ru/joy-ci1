import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex items-center">
        {/* Logo (remplace par ton image) */}
        <img 
          src="/image/logo.jpg" 
          alt="Logo" 
          className="h-10 w-10 mr-3"
        />
        {/* Nom du site */}
        <h1 className="text-2xl font-bold text-gray-800">JOY-CI</h1>
      </div>
    </header>
  );
};

export default Header;