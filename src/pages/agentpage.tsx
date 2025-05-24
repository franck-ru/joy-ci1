import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Skeleton } from "@/components/ui/skeleton";

<Skeleton className="w-[100px] h-[20px] rounded-full" />

type WasteType = 'ménager' | 'industriel' | 'médical' | 'plastique' | 'autre';
type Status = 'En attente' | 'En cours' | 'Terminé';

interface Signalement {
    id: number;
    title: string;
    description: string;
    location: string;
    wasteType: WasteType;
    date: string;
    status: Status;
    photo?: string;
    notes?: string;
}

const wasteTypeColors: Record<WasteType, string> = {
    'ménager': 'bg-orange-100 text-orange-800',
    'industriel': 'bg-gray-100 text-gray-800',
    'médical': 'bg-red-100 text-red-800',
    'plastique': 'bg-blue-100 text-blue-800',
    'autre': 'bg-green-100 text-green-800'
};

const AgentPage: React.FC = () => {
    const [signalements, setSignalements] = useState<Signalement[]>([]);
    const [selectedSignalement, setSelectedSignalement] = useState<Signalement | null>(null);
    const [filter, setFilter] = useState<Status | 'Tous'>('Tous');
    const [editMode, setEditMode] = useState(false);
    const [editedNotes, setEditedNotes] = useState('');

    // Chargement initial des données (remplacer par un appel API réel)
    useEffect(() => {
        const mockData: Signalement[] = [
            {
                id: 1,
                title: 'Poubelles débordantes',
                description: 'Déchets ménagers accumulés depuis 3 jours',
                location: 'Rue des Jardins, 75001 Paris',
                wasteType: 'ménager',
                date: '2023-06-20',
                status: 'En attente',
                photo: 'https://example.com/photo1.jpg',
                notes: 'À traiter en priorité'
            },
            {
                id: 2,
                title: 'Déchets médicaux',
                description: 'Seringues abandonnées près du parc',
                location: 'Avenue de la Santé, 75006 Paris',
                wasteType: 'médical',
                date: '2023-06-19',
                status: 'En cours',
                photo: 'https://example.com/photo2.jpg'
            }
        ];
        setSignalements(mockData);
    }, []);

    const filteredSignalements = filter === 'Tous'
        ? signalements
        : signalements.filter(s => s.status === filter);

    const handleStatusChange = (id: number, newStatus: Status) => {
        setSignalements(signalements.map(s =>
            s.id === id ? { ...s, status: newStatus } : s
        ));
    };

    const handleSaveNotes = () => {
        if (!selectedSignalement) return;

        setSignalements(signalements.map(s =>
            s.id === selectedSignalement.id
                ? { ...s, notes: editedNotes }
                : s
        ));
        setEditMode(false);
    };

    const openDetails = (signalement: Signalement) => {
        setSelectedSignalement(signalement);
        setEditedNotes(signalement.notes || '');
        setEditMode(false);
    };

    return (
        <div className= "min-h-screen flex flex-col bg-gray-50" >


        <main className="flex-grow container mx-auto px-4 py-8" >
            <h1 className="text-3xl font-bold text-center mb-8" > Espace Agent de Ramassage </h1>

    {/* Filtres */ }
    <div className="flex flex-wrap justify-center gap-2 mb-8" >
    {
        ['Tous', 'En attente', 'En cours', 'Terminé'].map((option) => (
            <button
              key= { option }
              onClick = {() => setFilter(option as Status | 'Tous')}
className = {`px-4 py-2 rounded-lg ${filter === option
        ? 'bg-blue-600 text-white'
        : 'bg-white text-gray-700 hover:bg-gray-100'
    }`}
            >
    { option }
    </button>
          ))}
</div>

{/* Liste des signalements */ }
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
{
    filteredSignalements.map((signalement) => (
        <div 
              key= { signalement.id } 
              className = "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick = {() => openDetails(signalement)}
    >
{
    signalement.photo && (
        <img 
                  src={ signalement.photo }
alt = "Signalement"
className = "w-full h-48 object-cover"
    />
              )}
<div className="p-4" >
    <div className="flex justify-between items-start" >
        <h2 className="text-xl font-bold" > { signalement.title } </h2>
            < span className = {`px-2 py-1 text-xs rounded-full ${wasteTypeColors[signalement.wasteType]}`}>
                { signalement.wasteType }
                </span>
                </div>
                < p className = "text-gray-600 mt-2 line-clamp-2" > { signalement.description } </p>

                    < div className = "mt-4 flex justify-between items-center" >
                        <span className={
                            `px-3 py-1 text-sm rounded-full ${signalement.status === 'En attente' ? 'bg-yellow-100 text-yellow-800' :
                                signalement.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                                    'bg-green-100 text-green-800'
                            }`
}>
    { signalement.status }
    </span>
    < span className = "text-sm text-gray-500" > { signalement.date } </span>
        </div>
        </div>
        </div>
          ))}
</div>

{
    selectedSignalement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" >
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" >
                <div className="p-6" >
                    <div className="flex justify-between items-start" >
                        <h2 className="text-2xl font-bold" > { selectedSignalement.title } </h2>
                            < button
    onClick = {() => setSelectedSignalement(null)
}
className = "text-gray-500 hover:text-gray-700"
    >
    <svg xmlns="http://www.w3.org/2000/svg" className = "h-6 w-6" fill = "none" viewBox = "0 0 24 24" stroke = "currentColor" >
        <path strokeLinecap="round" strokeLinejoin = "round" strokeWidth = { 2} d = "M6 18L18 6M6 6l12 12" />
            </svg>
            </button>
            </div>

{
    selectedSignalement.photo && (
        <img 
                    src={ selectedSignalement.photo }
    alt = "Signalement"
    className = "w-full h-64 object-cover mt-4 rounded-lg"
        />
                )
}

<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4" >
    <div>
    <h3 className="font-semibold" > Description </h3>
        < p className = "text-gray-700" > { selectedSignalement.description } </p>
            </div>
            < div >
            <h3 className="font-semibold" > Localisation </h3>
                < p className = "text-gray-700" > { selectedSignalement.location } </p>
                    </div>
                    < div >
                    <h3 className="font-semibold" > Type de déchets </h3>
                        < p className = "text-gray-700 capitalize" > { selectedSignalement.wasteType } </p>
                            </div>
                            < div >
                            <h3 className="font-semibold" > Date </h3>
                                < p className = "text-gray-700" > { selectedSignalement.date } </p>
                                    </div>
                                    </div>

                                    < div className = "mt-6" >
                                        <div className="flex justify-between items-center" >
                                            <h3 className="font-semibold" > Notes </h3>
{
    editMode ? (
        <div className= "flex gap-2" >
        <button 
                          onClick={ handleSaveNotes }
    className = "px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
        Enregistrer
        </button>
        < button
    onClick = {() => setEditMode(false)
}
className = "px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
    >
    Annuler
    </button>
    </div>
                    ) : (
    <button 
                        onClick= {() => setEditMode(true)}
className = "px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
    Modifier
    </button>
                    )}
</div>
{
    editMode ? (
        <textarea
                      value= { editedNotes }
                      onChange = {(e) => setEditedNotes(e.target.value)
}
className = "w-full p-2 border rounded mt-2"
rows = { 3}
    />
                  ) : (
    <p className= "text-gray-700 mt-2 whitespace-pre-wrap" >
    { selectedSignalement.notes || 'Aucune note' }
    </p>
                  )}
</div>

    < div className = "mt-6" >
        <h3 className="font-semibold mb-2" > Changer le statut </h3>
            < div className = "flex flex-wrap gap-2" >
                {(['En attente', 'En cours', 'Terminé'] as Status[]).map((status) => (
                    <button
                        key= { status }
                        onClick = {() => handleStatusChange(selectedSignalement.id, status)}
                    className = {`px-4 py-2 rounded ${selectedSignalement.status === status
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                      >
                    { status }
                    </button>
                ))}
</div>
    </div>

    < div className = "mt-8 flex justify-end" >
        <button
                    onClick={ () => setSelectedSignalement(null) }
className = "px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
    >
    Fermer
    </button>
    </div>
    </div>
    </div>
    </div>
        )}
</main>
    </div>
  );
};

export default AgentPage;