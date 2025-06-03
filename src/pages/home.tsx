import React from "react";
import { UNSAFE_createClientRoutesWithHMRRevalidationOptOut, useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";



const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header existant */}
      
      <main className="flex-grow flex flex-col items-center justify-center bg-blue-200 p-4">
        <h1 className="text-3xl font-green text-green-800 mb-8">Bienvenue sur JOY-CI</h1>
        <Skeleton className="w-[100px] h-[20px] rounded-full" />

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {/* Bouton Personnel pour les agents de la marie */}
          <button
            onClick={() => navigate("/personnel")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-lg shadow-md transition transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold mb-2">Personnel</h2>
            <p className="text-sm">Accès aux outils de gestion interne</p>
          </button>

          {/* Bouton Agents de ramassage qui ouvre la page home */}
          <button
            onClick={() => navigate("/agents")}
            className="bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-lg shadow-md transition transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold mb-2"> Agents de Ramassage</h2>
            <p className="text-sm">Interface de suivi des collectes</p>
          </button>

          {/* Bouton Citoyens  avec laison a la page citoyen page*/}
          <button
            onClick={() => navigate("/citoyens")}
            className="bg-red-500 hover:bg-black-600 text-white py-4 px-6 rounded-lg shadow-md transition transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold mb-2"> Citoyens</h2>
            <p className="text-sm">Services publics et informations</p>
          </button>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>qui sommes nous??</AccordionTrigger>
            <AccordionContent>
              une plate forme pour le signialement des differents depots menage .
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>comment nous joindre?</AccordionTrigger>
            <AccordionContent>
              <p> pour nous joindre bien vouloir ecrire au compte :franckyeptie@gmail.com </p>.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>qui sont les createurs??</AccordionTrigger>
            <AccordionContent>
              joy-ci est un eplate forme realise par une equipe de devvelopeur dirrige par MONTHE YAMDJEU FRANC RUSSEL
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>

    </div>
  );
};

export default HomePage;