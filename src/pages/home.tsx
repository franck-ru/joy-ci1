import React from "react";
import { UNSAFE_createClientRoutesWithHMRRevalidationOptOut, useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Leaf, Shield, Truck, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";



const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="flex-grow flex flex-col items-center justify-center bg-gray-50 pt-20 gap-10">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <Leaf className="h-12 w-12 text-green-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-800">Bienvenue sur JOY-CI</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Plateforme de gestion collaborative des déchets pour un environnement plus propre
        </p>
      </div>

      <div className="">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Connectez-vous selon votre rôle
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate("/citoyens")}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit group-hover:bg-blue-200 transition-colors">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl text-gray-800">Citoyen</CardTitle>
              <CardDescription>Signalez et suivez les déchets dans votre quartier</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Signaler des déchets</li>
                <li>• Suivre vos signalements</li>
                <li>• Voir le statut des tâches</li>
              </ul>
              <Button
                type="button"
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate("/citoyens")}
              >
                Se connecter
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate("/agents")}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit group-hover:bg-green-200 transition-colors">
                <Truck className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl text-gray-800">Agent de ramassage</CardTitle>
              <CardDescription>Gérez et réalisez les tâches de collecte</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Voir les tâches assignées</li>
                <li>• Planifier les itinéraires</li>
                <li>• Marquer les tâches terminées</li>
              </ul>
              <Button
                onClick={() => navigate("/agents")}
                className="w-full mt-4 bg-green-600 hover:bg-green-700"
              >
                Se connecter
              </Button>
            </CardContent>
          </Card>


          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate("/personnel")}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-fit group-hover:bg-purple-200 transition-colors">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl text-gray-800">Administrateur</CardTitle>
              <CardDescription>Supervisez et analysez les opérations</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Dashboard statistiques</li>
                <li>• Gestion des utilisateurs</li>
                <li>• Rapports détaillés</li>
              </ul>
              <Button
                onClick={() => navigate("/personnel")}
                className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
              >
                Se connecter
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Some Questions */}
      <div className="bg-blue-600/5 w-full mt-10  p-10">
        <Accordion
          type="single"
          collapsible
          className="w-full mx-auto max-w-xl"
        >
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

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            JOY-CI, Ensemble pour un environnement plus propre et durable
          </p>
        </div>
      </div>
    </main>
  );
};

export default HomePage;