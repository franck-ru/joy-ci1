import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

type WasteType = 'ménager' | 'industriel' | 'médical' | 'plastique' | 'autre';

type Task = {
    id: number;
    title: string;
    description: string;
    location: string;
    wasteType: WasteType;
    date: string;
    status: 'En attente' | 'En cours' | 'Résolu';
};

const wasteTypeColors: Record<WasteType, string> = {
    'ménager': 'bg-orange-100 text-orange-800 border-orange-200',
    'industriel': 'bg-gray-100 text-gray-800 border-gray-200',
    'médical': 'bg-red-100 text-red-800 border-red-200',
    'plastique': 'bg-blue-100 text-blue-800 border-blue-200',
    'autre': 'bg-green-100 text-green-800 border-green-200'
};

const wasteTypeEmojis: Record<WasteType, string> = {
    'ménager': '🗑️',
    'industriel': '🏭',
    'médical': '🏥',
    'plastique': '🥤',
    'autre': '♻️'
};

const CitoyenPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'signalement' | 'visualisation'>('signalement');
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            title: 'Poubelles débordantes',
            description: 'Déchets ménagers accumulés',
            location: 'Rue des Jardins',
            wasteType: 'ménager',
            date: '20/06/2023',
            status: 'En attente'
        }
    ]);

    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        location: '',
        wasteType: 'ménager' as WasteType
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const task: Task = {
            id: tasks.length + 1,
            title: newTask.title,
            description: newTask.description,
            location: newTask.location,
            wasteType: newTask.wasteType,
            date: new Date().toLocaleDateString(),
            status: 'En attente'
        };
        setTasks([...tasks, task]);
        setNewTask({
            title: '',
            description: '',
            location: '',
            wasteType: 'ménager'
        });
    };

    return (
        <div className= "min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-green-100" >

        <main className="flex-grow container mx-auto px-4 py-8" >
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden" >
                <h1 className="text-3xl font-bold text-center py-6 bg-green-500 text-white" >
                    Espace Citoyen
                        </h1>

    {/* Boutons de navigation */ }
    <div className="flex justify-center py-4 bg-green-50" >
        <button
              onClick={ () => setActiveTab('signalement') }
    className = {`px-6 py-2 mx-2 rounded-lg font-medium transition-all ${activeTab === 'signalement'
        ? 'bg-green-600 text-white shadow-md'
        : 'bg-white text-green-700 hover:bg-green-100'
        }`
}
            >
    Nouveau Signalement
        </button>
        < button
onClick = {() => setActiveTab('visualisation')}
className = {`px-6 py-2 mx-2 rounded-lg font-medium transition-all ${activeTab === 'visualisation'
    ? 'bg-green-600 text-white shadow-md'
    : 'bg-white text-green-700 hover:bg-green-100'
    }`}
            >
    Voir mes Signalements
        </button>
        </div>

{/* Contenu des onglets */ }
<div className="p-6" >
    { activeTab === 'signalement' ? (
        <div className= "max-w-2xl mx-auto" >
<h2 className="text-2xl font-semibold mb-6 text-green-800" > Formulaire de Signalement </h2>
    < form onSubmit = { handleSubmit } className = "space-y-5" >
        <div>
        <label className="block mb-2 font-medium text-green-700" > Titre du problème </label>
            < input
type = "text"
className = "w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-400"
value = { newTask.title }
onChange = {(e) => setNewTask({ ...newTask, title: e.target.value })}
required
placeholder = "Ex: Déchets abandonnés"
    />
    </div>

    < div >
    <label className="block mb-2 font-medium text-green-700" > Type de déchets </label>
        < div className = "grid grid-cols-2 md:grid-cols-3 gap-3" >
            {(Object.keys(wasteTypeColors) as WasteType[]).map((type) => (
                <button
                          key= { type }
                          type = "button"
                          onClick = {() => setNewTask({ ...newTask, wasteType: type })}
                className = {`p-3 border rounded-lg flex flex-col items-center justify-center space-y-2 transition-all ${wasteTypeColors[type]
                    } ${newTask.wasteType === type
                        ? 'ring-2 ring-offset-2 ring-green-400 scale-[1.02]'
                        : 'hover:scale-[1.02]'
                    }`}
                        >
                <span className="text-2xl" > { wasteTypeEmojis[type]} </span>
            < span className = "capitalize font-medium" > { type } </span>
            </button>
            ))}
</div>
    </div>

    < div >
    <label className="block mb-2 font-medium text-green-700" > Description </label>
        < textarea
className = "w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-400"
rows = { 4}
value = { newTask.description }
onChange = {(e) => setNewTask({ ...newTask, description: e.target.value })}
required
placeholder = "Décrivez précisément le problème..."
    />
    </div>

    < div >
    <label className="block mb-2 font-medium text-green-700" > Localisation exacte </label>
        < input
type = "text"
className = "w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-400"
value = { newTask.location }
onChange = {(e) => setNewTask({ ...newTask, location: e.target.value })}
required
placeholder = "Adresse ou point de repère"
    />
    </div>

    < button
type = "submit"
className = "w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
    >
    <span>Envoyer le signalement </span>
        < svg xmlns = "http://www.w3.org/2000/svg" className = "h-5 w-5" viewBox = "0 0 20 20" fill = "currentColor" >
            <path fillRule="evenodd" d = "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule = "evenodd" />
                </svg>
                </button>
                </form>
                </div>
            ) : (
    <div>
    <h2 className= "text-2xl font-semibold mb-6 text-green-800" > Historique des Signalements </h2>
{
    tasks.length === 0 ? (
        <div className= "text-center py-10 text-green-600 bg-green-50 rounded-lg" >
        <svg xmlns="http://www.w3.org/2000/svg" className = "h-12 w-12 mx-auto mb-4 text-green-400" fill = "none" viewBox = "0 0 24 24" stroke = "currentColor" >
            <path strokeLinecap="round" strokeLinejoin = "round" strokeWidth = { 2} d = "M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                < p className = "text-lg" > Aucun signalement enregistré pour le moment.</p>
                    < button
    onClick = {() => setActiveTab('signalement')
}
className = "mt-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
    >
    Faire un signalement
        </button>
        </div>
                ) : (
    <div className= "space-y-4" >
    {
        tasks.map((task) => (
            <div 
                        key= { task.id } 
                        className = {`p-5 border rounded-lg transition-all hover:shadow-md ${wasteTypeColors[task.wasteType]
                }`}
    >
    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4" >
        <div className="flex-1" >
            <div className="flex items-center space-x-3 mb-2" >
                <span className="text-2xl" > { wasteTypeEmojis[task.wasteType]} </span>
                    < h3 className = "font-bold text-lg text-gray-900" > { task.title } </h3>
                        </div>
                        < p className = "text-gray-700" > { task.description } </p>
                            < div className = "mt-3 flex items-center text-sm text-green-700" >
                                <svg xmlns="http://www.w3.org/2000/svg" className = "h-4 w-4 mr-1" fill = "none" viewBox = "0 0 24 24" stroke = "currentColor" >
                                    <path strokeLinecap="round" strokeLinejoin = "round" strokeWidth = { 2} d = "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin = "round" strokeWidth = { 2} d = "M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            < span > { task.location } </span>
                                            </div>
                                            </div>
                                            < div className = "flex flex-col items-end space-y-2" >
                                                <span className={
    `px-3 py-1 text-sm rounded-full font-medium ${task.status === 'En attente' ? 'bg-yellow-100 text-yellow-800' :
        task.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
            'bg-green-100 text-green-800'
        }`
}>
    { task.status }
    </span>
    < span className = "text-xs text-gray-500" >
        { task.date }
        </span>
        </div>
        </div>
        </div>
                    ))}
</div>
                )}
</div>
            )}
</div>
    </div>
    </main>
    </div>
  );
};

export default CitoyenPage;