import React, { useState } from 'react';

type WasteType = 'ménager' | 'industriel' | 'médical' | 'plastique' | 'dangereux' | 'encombrant' | 'autre';
type TaskStatus = 'En attente' | 'En cours' | 'Terminé';

interface Task {
    id: string;
    title: string;
    description: string;
    location: string;
    wasteType: WasteType;
    date: string;
    status: TaskStatus;
    citizenEmail?: string;
    assignedAgent?: string;
}

const AgentPage: React.FC = () => {
    // États
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 'TASK-001',
            title: 'Dépôt sauvage rue des Jardins',
            description: 'Déchets ménagers accumulés depuis plusieurs jours',
            location: 'Rue des Jardins, Abidjan',
            wasteType: 'ménager',
            date: '15/06/2023',
            status: 'En attente',
            citizenEmail: 'citoyen@example.com'
        },
        {
            id: 'TASK-002',
            title: 'Déchets médicaux abandonnés',
            description: 'Seringues et déchets médicaux près du dispensaire',
            location: 'Avenue Marchand, Cocody',
            wasteType: 'médical',
            date: '16/06/2023',
            status: 'En cours',
            assignedAgent: 'Agent Koné'
        }
    ]);

    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [filterStatus, setFilterStatus] = useState<'all' | TaskStatus>('all');

    // Filtrer les tâches
    const filteredTasks = tasks.filter(task =>
        filterStatus === 'all' || task.status === filterStatus
    );

    // Mettre à jour le statut d'une tâche
    const updateTaskStatus = (taskId: string, status: TaskStatus) => {
        setTasks(tasks.map(task =>
            task.id === taskId
                ? { ...task, status, assignedAgent: 'Vous' }
                : task
        ));
        setSelectedTask(null);
    };

    return (
        <div className= "min-h-screen bg-gray-100" >
        <header className="bg-green-600 text-white p-4 shadow-md" >
            <div className="container mx-auto flex justify-between items-center" >
                <h1 className="text-2xl font-bold" > Espace Agent de Ramassage </h1>
                    < div className = "flex items-center space-x-4" >
                        <span className="bg-white text-green-600 px-3 py-1 rounded-full" >
                            Agent Koné
                                </span>
                                < button className = "bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white" >
                                    Déconnexion
                                    </button>
                                    </div>
                                    </div>
                                    </header>

                                    < main className = "container mx-auto p-4" >
                                        <div className="bg-white rounded-lg shadow-md overflow-hidden" >
                                            {/* Filtres */ }
                                            < div className = "p-4 bg-gray-50 border-b" >
                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4" >
                                                    <h2 className="text-xl font-semibold text-gray-800" >
                                                        Tâches assignées
                                                            </h2>

                                                            < div className = "flex flex-col sm:flex-row gap-3" >
                                                                <select
                  value={ filterStatus }
    onChange = {(e) => setFilterStatus(e.target.value as 'all' | TaskStatus)}
className = "border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
    >
    <option value="all" > Toutes les tâches </option>
        < option value = "En attente" > En attente </option>
            < option value = "En cours" > En cours </option>
                < option value = "Terminé" > Terminé </option>
                    </select>
                    </div>
                    </div>
                    </div>

{/* Liste des tâches */ }
<div className="divide-y divide-gray-200" >
    {
        filteredTasks.length === 0 ? (
            <div className= "p-8 text-center text-gray-500" >
            Aucune tâche correspondante trouvée
            </ div >
            ) : (
    filteredTasks.map(task => (
        <div 
                  key= { task.id } 
                  className = "p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick = {() => setSelectedTask(task)}
                >
        <div className="flex justify-between items-start" >
    <div>
    <h3 className="font-bold text-lg" > { task.title } </h3>
    < p className = "text-gray-600" > { task.description } </p>

    < div className = "mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm" >
    <span className="flex items-center text-gray-500" >
    <i className="bi bi-geo-alt mr-1" > </i>
                          { task.location }
        </span>
        < span className = "flex items-center text-gray-500" >
        <i className="bi bi-calendar mr-1" > </i>
                          { task.date }
        </span>
                        {
            task.citizenEmail && (
                <span className="flex items-center text-gray-500">
                    <i className="bi bi-envelope mr-1"> </i>
                            { task.citizenEmail }
        </span>
    )}
</div>
    </div>

    < div className = "flex flex-col items-end" >
        <span className={
            `px-3 py-1 rounded-full text-sm font-medium ${task.status === 'En attente' ? 'bg-yellow-100 text-yellow-800' :
                task.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
            }`
}>
    { task.status }
    </span>
{
    task.assignedAgent && (
        <span className="text-xs text-gray-500 mt-1" >
            { task.assignedAgent }
            </span>
                      )
}
</div>
    </div>
    </div>
              ))
            )}
</div>
    </div>
    </main>

{/* Modal de détail de tâche */ }
{
    selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" >
                <div className="p-6" >
                    <div className="flex justify-between items-start" >
                        <h2 className="text-2xl font-bold" > Détails de la tâche </h2>
                            < button
    onClick = {() => setSelectedTask(null)
}
className = "text-gray-500 hover:text-gray-700"
    >
                  & times;
</button>
    </div>

    < div className = "mt-6 space-y-4" >
        <div>
        <h3 className="font-semibold" > Titre </h3>
            < p > { selectedTask.title } </p>
            </div>

            < div >
            <h3 className="font-semibold" > Description </h3>
                < p > { selectedTask.description } </p>
                </div>

                < div >
                <h3 className="font-semibold" > Localisation </h3>
                    < p > { selectedTask.location } </p>
                    </div>

                    < div >
                    <h3 className="font-semibold" > Type de déchets </h3>
                        < p className = "capitalize" > { selectedTask.wasteType } </p>
                            </div>

                            < div >
                            <h3 className="font-semibold" > Statut </h3>
                                < div className = "mt-2" >
                                    <select
                      value={ selectedTask.status }
onChange = {(e) => updateTaskStatus(selectedTask.id, e.target.value as TaskStatus)}
className = "border border-gray-300 rounded-md px-3 py-2 w-full"
    >
    <option value="En attente" > En attente </option>
        < option value = "En cours" > En cours </option>
            < option value = "Terminé" > Terminé </option>
                </select>
                </div>
                </div>
                </div>

                < div className = "mt-8 flex justify-end" >
                    <button
                  onClick={ () => setSelectedTask(null) }
className = "px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
    >
    Valider
    </button>
    </div>
    </div>
    </div>
    </div>
      )}
</div>
  );
};

export default AgentPage;