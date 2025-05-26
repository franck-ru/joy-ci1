import React, { useState, useRef } from 'react';
import { Skeleton } from "@/components/ui/skeleton";

// Types
type WasteType = 'ménager' | 'industriel' | 'médical' | 'plastique' | 'dangereux' | 'encombrant' | 'autre';
type TaskStatus = 'En attente' | 'En cours' | 'Résolu';

interface Task {
    id: string;
    title: string;
    description: string;
    location: string;
    wasteType: WasteType;
    date: string;
    status: TaskStatus;
    email?: string;
    photoUrl?: string;
    rating?: number;
    progress?: number;
    comments?: string[];
}

// Constantes
const WASTE_TYPES: WasteType[] = ['ménager', 'industriel', 'médical', 'plastique', 'dangereux', 'encombrant', 'autre'];

const wasteTypeDetails: Record<WasteType, { color: string; emoji: string; description: string }> = {
    'ménager': { color: 'bg-orange-100 text-orange-800 border-orange-200', emoji: '🗑️', description: 'Déchets quotidiens du foyer' },
    'industriel': { color: 'bg-gray-100 text-gray-800 border-gray-200', emoji: '🏭', description: 'Déchets provenant d\'usines ou industries' },
    'médical': { color: 'bg-red-100 text-red-800 border-red-200', emoji: '🏥', description: 'Déchets médicaux ou pharmaceutiques' },
    'plastique': { color: 'bg-blue-100 text-blue-800 border-blue-200', emoji: '🥤', description: 'Déchets plastiques' },
    'dangereux': { color: 'bg-purple-100 text-purple-800 border-purple-200', emoji: '☢️', description: 'Déchets dangereux ou toxiques' },
    'encombrant': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', emoji: '🛋️', description: 'Objets volumineux' },
    'autre': { color: 'bg-green-100 text-green-800 border-green-200', emoji: '♻️', description: 'Autres types de déchets' }
};

const statusColors: Record<TaskStatus, string> = {
    'En attente': 'bg-yellow-100 text-yellow-800',
    'En cours': 'bg-blue-100 text-blue-800',
    'Résolu': 'bg-green-100 text-green-800'
};

const CitoyenPage: React.FC = () => {
    // États
    const [activeTab, setActiveTab] = useState<'signalement' | 'visualisation'>('signalement');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        location: '',
        wasteType: 'ménager' as WasteType,
        email: '',
        photo: null as File | null
    });
    const [filterStatus, setFilterStatus] = useState<'all' | TaskStatus>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Gestion des photos
    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setNewTask({ ...newTask, photo: e.target.files[0] });
        }
    };

    // Soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Génération d'un ID unique
        const taskId = `TASK-${Date.now()}`;

        // Gestion de la photo (simulation d'upload)
        let photoUrl = '';
        if (newTask.photo) {
            photoUrl = URL.createObjectURL(newTask.photo);
        }

        const newTaskEntry: Task = {
            id: taskId,
            title: newTask.title,
            description: newTask.description,
            location: newTask.location,
            wasteType: newTask.wasteType,
            date: new Date().toLocaleDateString('fr-FR'),
            status: 'En attente',
            email: newTask.email || undefined,
            photoUrl: photoUrl || undefined,
            progress: 0,
            comments: []
        };

        setTasks([...tasks, newTaskEntry]);
        resetForm();
    };

    const resetForm = () => {
        setNewTask({
            title: '',
            description: '',
            location: '',
            wasteType: 'ménager',
            email: '',
            photo: null
        });
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // Notation d'une tâche
    const handleRating = (taskId: string, rating: number) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, rating } : task
        ));
    };

    // Filtrage des tâches
    const filteredTasks = tasks.filter(task => {
        const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
        const matchesSearch = searchTerm === '' ||
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.location.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    // Affichage de la progression
    const renderProgressBar = (progress: number = 0) => {
        return (
            <div className= "w-full bg-gray-200 rounded-full h-2.5" >
            <div 
                    className="bg-green-600 h-2.5 rounded-full"
        style = {{ width: `${progress}%` }
    }
                > </div>
        </div>
        );
    };

return (
    <div className= "min-h-screen bg-gradient-to-b from-green-50 to-green-100" >
    <main className="container mx-auto px-4 py-8" >
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden" >
            <h1 className="text-3xl font-bold text-center py-6 bg-green-600 text-white" >
                 joy-CI - Espace Citoyen
                    </h1>

{/* Navigation */ }
<div className="flex flex-col sm:flex-row justify-center py-4 bg-green-50 gap-2 px-4" >
    <button
                            onClick={ () => setActiveTab('signalement') }
className = {`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'signalement'
    ? 'bg-green-600 text-white shadow-md'
    : 'bg-white text-green-700 hover:bg-green-100'
    }`}
                        >
    Nouveau Signalement
        </button>
        < button
onClick = {() => setActiveTab('visualisation')}
className = {`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'visualisation'
    ? 'bg-green-600 text-white shadow-md'
    : 'bg-white text-green-700 hover:bg-green-100'
    }`}
                        >
    Mes Signalements
        </button>
        </div>

{/* Contenu */ }
<div className="p-6" >
    { activeTab === 'signalement' ? (
        <div className= "max-w-2xl mx-auto" >
<h2 className="text-2xl font-semibold mb-6 text-green-800" >
    Formulaire de Signalement
        </h2>
        < form onSubmit = { handleSubmit } className = "space-y-5" >
            <div>
            <label className="block mb-2 font-medium text-green-700" >
                Titre du problème *
                    </label>
                    < input
type = "text"
className = "w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-400"
value = { newTask.title }
onChange = {(e) => setNewTask({ ...newTask, title: e.target.value })}
required
placeholder = "Ex: Dépôt sauvage de déchets"
    />
    </div>

    < div >
    <label className="block mb-2 font-medium text-green-700" >
        Type de déchets *
            </label>
            < select
value = { newTask.wasteType }
onChange = {(e) => setNewTask({ ...newTask, wasteType: e.target.value as WasteType })}
className = "w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-400"
required
    >
{
    WASTE_TYPES.map((type) => (
        <option key= { type } value = { type } >
        { wasteTypeDetails[type].emoji } { type.charAt(0).toUpperCase() + type.slice(1) }
    </option>
    ))
}
    </select>
    < p className = "text-sm text-gray-500 mt-1" >
        { wasteTypeDetails[newTask.wasteType].description }
        </p>
        </div>

        < div >
        <label className="block mb-2 font-medium text-green-700" >
            Description détaillée *
                </label>
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
    <label className="block mb-2 font-medium text-green-700" >
        Localisation exacte *
            </label>
            < input
type = "text"
className = "w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-400"
value = { newTask.location }
onChange = {(e) => setNewTask({ ...newTask, location: e.target.value })}
required
placeholder = "Adresse ou point de repère précis"
    />
    </div>

    < div >
    <label className="block mb-2 font-medium text-green-700" >
        Email(pour suivi)
        </label>
        < input
type = "email"
className = "w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-400"
value = { newTask.email }
onChange = {(e) => setNewTask({ ...newTask, email: e.target.value })}
placeholder = "Votre email pour recevoir les mises à jour"
    />
    </div>

    < div >
    <label className="block mb-2 font-medium text-green-700" >
        Photo du dépôt(recommandé)
            </label>
            < div className = "flex items-center space-x-4" >
                <label className="cursor-pointer bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors" >
                    <input
                                                    type="file"
ref = { fileInputRef }
accept = "image/*"
onChange = { handlePhotoChange }
className = "hidden"
capture = "environment"
    />
    <i className="bi bi-camera mr-2" > </i> Prendre une photo
        </label>
{
    newTask.photo && (
        <span className="text-sm text-green-600" >
            { newTask.photo.name }
            </span>
                                            )
}
</div>
    < p className = "text-xs text-gray-500 mt-1" >
        Une photo aide à mieux localiser et identifier le problème
            </p>
            </div>

            < button
type = "submit"
className = "w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
    >
    <span>Envoyer le signalement </span>
        < i className = "bi bi-send" > </i>
            </button>
            </form>
            </div>
                        ) : (
    <div>
    <div className= "flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4" >
    <h2 className="text-2xl font-semibold text-green-800" >
        Historique des Signalements
            </h2>
            < div className = "flex flex-col sm:flex-row gap-3 w-full md:w-auto" >
                <select
                                            value={ filterStatus }
onChange = {(e) => setFilterStatus(e.target.value as 'all' | TaskStatus)}
className = "border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
    >
    <option value="all" > Tous les statuts </option>
        < option value = "En attente" > En attente </option>
            < option value = "En cours" > En cours </option>
                < option value = "Résolu" > Résolu </option>
                    </select>
                    < input
type = "text"
placeholder = "Rechercher..."
className = "border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
value = { searchTerm }
onChange = {(e) => setSearchTerm(e.target.value)}
                                        />
    </div>
    </div>

{
    filteredTasks.length === 0 ? (
        <div className= "text-center py-10 text-green-600 bg-green-50 rounded-lg" >
        <i className="bi bi-inbox text-4xl mb-3 text-green-400" > </i>
            < p className = "text-lg" >
            {
                tasks.length === 0
                    ? "Vous n'avez aucun signalement enregistré"
                    : "Aucun signalement ne correspond à vos critères"
            }
                </p>
    {
        tasks.length === 0 && (
            <button
                                                onClick={ () => setActiveTab('signalement') }
        className = "mt-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
            >
            Faire un premier signalement
                </button>
                                        )
    }
    </div>
                                ) : (
        <div className= "space-y-4" >
        {
            filteredTasks.map((task) => (
                <div
                                                key= { task.id }
                                                className = {`p-5 border rounded-lg transition-all hover:shadow-md ${wasteTypeDetails[task.wasteType].color}`}
        >
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4" >
            <div className="flex-1" >
                <div className="flex items-center space-x-3 mb-2" >
                    <span className="text-2xl" >
                        { wasteTypeDetails[task.wasteType].emoji }
                        </span>
                        < h3 className = "font-bold text-lg text-gray-900" >
                            { task.title }
                            </h3>
                            </div>
                            < p className = "text-gray-700 mb-3" >
                                { task.description }
                                </p>

    {/* Barre de progression */ }
    {
        task.status !== 'En attente' && (
            <div className="mb-3" >
                <div className="flex justify-between text-sm mb-1" >
                    <span>Progression: </span>
                        < span > { task.progress || 0 } % </span>
                        </div>
        { renderProgressBar(task.progress) }
        </div>
                                                        )
    }

    <div className="flex flex-wrap gap-3 text-sm" >
        <div className="flex items-center text-green-700" >
            <i className="bi bi-geo-alt mr-1" > </i>
                < span > { task.location } </span>
                </div>
                < div className = "flex items-center text-gray-500" >
                    <i className="bi bi-calendar mr-1" > </i>
                        < span > { task.date } </span>
                        </div>
    {
        task.email && (
            <div className="flex items-center text-gray-600" >
                <i className="bi bi-envelope mr-1" > </i>
                    < span > { task.email } </span>
                    </div>
                                                            )
    }
    </div>
        </div>

        < div className = "flex flex-col items-end space-y-2 min-w-[120px]" >
            <span className={ `px-3 py-1 text-sm rounded-full font-medium ${statusColors[task.status]}` }>
                { task.status }
                </span>
                </div>
                </div>

    {
        task.photoUrl && (
            <div className="mt-4" >
                <img
                                                            src={ task.photoUrl }
        alt = "Photo du dépôt de déchets"
        className = "w-full max-w-md rounded-lg border border-gray-200"
            />
            </div>
                                                )
    }

    {
        task.status === 'Résolu' && (
            <div className="mt-4 pt-4 border-t border-gray-200" >
                <p className="text-sm font-medium text-gray-700 mb-2" >
                    Notez la résolution du problème:
        </p>
            < div className = "flex space-x-2" >
            {
                [1, 2, 3, 4, 5].map((star) => (
                    <button
                                                                    key= { star }
                                                                    onClick = {() => handleRating(task.id, star)}
        className = {`text-2xl ${task.rating && star <= task.rating
            ? 'text-yellow-400'
            : 'text-gray-300'
            }`
    }
                                                                >
                                                                    ★
    </button>
                                                            ))
}
</div>
    </div>
                                                )}
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