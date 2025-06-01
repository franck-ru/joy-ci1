import React, { useState, useEffect } from 'react';
import {
    User,
    LogOut,
    CheckCircle,
    Clock,
    AlertTriangle,
    MapPin,
    BarChart3,
    Calendar,
    Filter,
    UserPlus,
    Users,
    Trash2,
    Shield,
    Plus,
    X,
    Edit,
    Save,
    Eye,
    EyeOff
} from 'lucide-react';


interface Task {
    id: number;
    title: string;
    location: string;
    status: 'completed' | 'in-progress' | 'pending';
    priority: 'high' | 'medium' | 'low';
    date: string;
    description: string;
    wasteType: string;
}

interface ZoneRisk {
    zone: string;
    riskLevel: number;
    reports: number;
}

interface Personnel {
    name: string;
    id: string;
    role: string;
}

interface Agent {
    id: number;
    name: string;
    phone: string;
    zone: string;
    status: 'active' | 'inactive';
    tasksCompleted: number;
}

interface WasteType {
    type: string;
    riskLevel: 'high' | 'medium' | 'low';
    count: number;
    description: string;
}

interface Account {
    id: number;
    username: string;
    role: 'admin' | 'agent' | 'supervisor';
    email: string;
    status: 'active' | 'inactive';
    lastLogin: string;
}

const PersonnelDashboard: React.FC = () => {
    const [personnel] = useState<Personnel>({
        name: "Jean Dupont",
        id: "P001",
        role: "Superviseur"
    });

    const [activeTab, setActiveTab] = useState<string>('dashboard');

    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            title: "Nettoyage dépôt sauvage",
            location: "Rue de la Paix, Zone A",
            status: 'completed',
            priority: 'high',
            date: '2025-05-30',
            description: "Dépôt de déchets ménagers signalé",
            wasteType: "Déchets toxiques"
        },
        {
            id: 2,
            title: "Inspection décharge illégale",
            location: "Avenue des Fleurs, Zone B",
            status: 'in-progress',
            priority: 'medium',
            date: '2025-06-01',
            description: "Vérification suite à signalement",
            wasteType: "Déchets médicaux"
        },
        {
            id: 3,
            title: "Collecte déchets industriels",
            location: "Zone Industrielle, Zone C",
            status: 'pending',
            priority: 'high',
            date: '2025-06-02',
            description: "Intervention programmée",
            wasteType: "Déchets chimiques"
        }
    ]);

    const [agents, setAgents] = useState<Agent[]>([
        { id: 1, name: "Marie Kouassi", phone: " 6 07 12 34 56", zone: "Zone A", status: 'active', tasksCompleted: 45 },
        { id: 2, name: "Paul Koffi", phone: "6 07 65 43 21", zone: "Zone B", status: 'active', tasksCompleted: 38 },
        { id: 3, name: "Fatou Traoré", phone: "6 07 98 76 54", zone: "Zone C", status: 'inactive', tasksCompleted: 29 }
    ]);

    const [accounts, setAccounts] = useState<Account[]>([
        { id: 1, username: "admin", role: 'admin', email: "admin@waste.cm", status: 'active', lastLogin: "2025-06-01 08:30" },
        { id: 2, username: "marie.kouassi", role: 'agent', email: "marie@waste.cm", status: 'active', lastLogin: "2025-06-01 07:15" },
        { id: 3, username: "paul.koffi", role: 'agent', email: "paul@waste.cm", status: 'active', lastLogin: "2025-05-31 16:45" },
        { id: 4, username: "fatou.traore", role: 'supervisor', email: "fatou@waste.cm", status: 'inactive', lastLogin: "2025-05-28 14:20" }
    ]);

    const [wasteTypes] = useState<WasteType[]>([
        { type: "Déchets toxiques", riskLevel: 'high', count: 23, description: "Produits chimiques, peintures, solvants" },
        { type: "Déchets médicaux", riskLevel: 'high', count: 18, description: "Seringues, médicaments périmés" },
        { type: "Batteries/Piles", riskLevel: 'medium', count: 15, description: "Batteries automobiles, piles usagées" },
        { type: "Déchets électroniques", riskLevel: 'medium', count: 12, description: "Ordinateurs, télévisions, téléphones" },
        { type: "Huiles usagées", riskLevel: 'high', count: 8, description: "Huiles moteur, hydrauliques" }
    ]);

    const [resolvedReports] = useState(127);

    const [riskZones] = useState<ZoneRisk[]>([
        { zone: "Zone A - Centre Ville", riskLevel: 85, reports: 45 },
        { zone: "Zone B - Quartier Nord", riskLevel: 72, reports: 38 },
        { zone: "Zone C - Zone Industrielle", riskLevel: 68, reports: 29 },
        { zone: "Zone D - Banlieue Sud", riskLevel: 45, reports: 15 }
    ]);

    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [showAddAgentModal, setShowAddAgentModal] = useState(false);
    const [showAddAccountModal, setShowAddAccountModal] = useState(false);
    const [showPasswords, setShowPasswords] = useState<{ [key: number]: boolean }>({});

    const [newAgent, setNewAgent] = useState({
        name: '',
        phone: '',
        zone: 'Zone A'
    });

    const [newAccount, setNewAccount] = useState({
        username: '',
        email: '',
        role: 'agent' as 'admin' | 'agent' | 'supervisor',
        password: ''
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'in-progress': return 'bg-blue-100 text-blue-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'active': return 'bg-green-100 text-green-800';
            case 'inactive': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getRiskLevelColor = (level: 'high' | 'medium' | 'low') => {
        switch (level) {
            case 'high': return 'bg-red-100 text-red-800 border-red-200';
            case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'low': return 'bg-green-100 text-green-800 border-green-200';
        }
    };

    const handleAddAgent = () => {
        if (newAgent.name && newAgent.phone) {
            const agent: Agent = {
                id: agents.length + 1,
                name: newAgent.name,
                phone: newAgent.phone,
                zone: newAgent.zone,
                status: 'active',
                tasksCompleted: 0
            };
            setAgents([...agents, agent]);
            setNewAgent({ name: '', phone: '', zone: 'Zone A' });
            setShowAddAgentModal(false);
        }
    };

    const handleAddAccount = () => {
        if (newAccount.username && newAccount.email && newAccount.password) {
            const account: Account = {
                id: accounts.length + 1,
                username: newAccount.username,
                email: newAccount.email,
                role: newAccount.role,
                status: 'active',
                lastLogin: 'Jamais connecté'
            };
            setAccounts([...accounts, account]);
            setNewAccount({ username: '', email: '', role: 'agent', password: '' });
            setShowAddAccountModal(false);
        }
    };

    const toggleAgentStatus = (id: number) => {
        setAgents(agents.map(agent =>
            agent.id === id
                ? { ...agent, status: agent.status === 'active' ? 'inactive' : 'active' }
                : agent
        ));
    };

    const toggleAccountStatus = (id: number) => {
        setAccounts(accounts.map(account =>
            account.id === id
                ? { ...account, status: account.status === 'active' ? 'inactive' : 'active' }
                : account
        ));
    };

    const togglePasswordVisibility = (id: number) => {
        setShowPasswords(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const filteredTasks = tasks.filter(task =>
        filterStatus === 'all' || task.status === filterStatus
    );

    const getStatusCounts = () => {
        return {
            completed: tasks.filter(t => t.status === 'completed').length,
            inProgress: tasks.filter(t => t.status === 'in-progress').length,
            pending: tasks.filter(t => t.status === 'pending').length
        };
    };

    const statusCounts = getStatusCounts();

    const handleLogout = () => {
        alert('Déconnexion effectuée');
    };

    const renderDashboard = () => (
        <div className= "space-y-6" >
        {/* Stats Cards */ }
        < div className = "grid grid-cols-1 md:grid-cols-4 gap-6" >
            <div className="bg-white rounded-xl shadow-sm p-6" >
                <div className="flex items-center justify-between" >
                    <div>
                    <p className="text-sm font-medium text-gray-600" > Terminées </p>
                        < p className = "text-2xl font-bold text-green-600" > { statusCounts.completed } </p>
                            </div>
                            < CheckCircle className = "w-8 h-8 text-green-600" />
                                </div>
                                </div>

                                < div className = "bg-white rounded-xl shadow-sm p-6" >
                                    <div className="flex items-center justify-between" >
                                        <div>
                                        <p className="text-sm font-medium text-gray-600" > En cours </p>
                                            < p className = "text-2xl font-bold text-blue-600" > { statusCounts.inProgress } </p>
                                                </div>
                                                < Clock className = "w-8 h-8 text-blue-600" />
                                                    </div>
                                                    </div>

                                                    < div className = "bg-white rounded-xl shadow-sm p-6" >
                                                        <div className="flex items-center justify-between" >
                                                            <div>
                                                            <p className="text-sm font-medium text-gray-600" > En attente </p>
                                                                < p className = "text-2xl font-bold text-yellow-600" > { statusCounts.pending } </p>
                                                                    </div>
                                                                    < AlertTriangle className = "w-8 h-8 text-yellow-600" />
                                                                        </div>
                                                                        </div>

                                                                        < div className = "bg-white rounded-xl shadow-sm p-6" >
                                                                            <div className="flex items-center justify-between" >
                                                                                <div>
                                                                                <p className="text-sm font-medium text-gray-600" > Signalements résolus </p>
                                                                                    < p className = "text-2xl font-bold text-purple-600" > { resolvedReports } </p>
                                                                                        </div>
                                                                                        < BarChart3 className = "w-8 h-8 text-purple-600" />
                                                                                            </div>
                                                                                            </div>
                                                                                            </div>

                                                                                            < div className = "grid grid-cols-1 lg:grid-cols-2 gap-6" >
                                                                                                {/* Risk Zones */ }
                                                                                                < div className = "bg-white rounded-xl shadow-sm" >
                                                                                                    <div className="p-6 border-b border-gray-200" >
                                                                                                        <h2 className="text-lg font-semibold text-gray-900" > Zones à Risque </h2>
                                                                                                            </div>
                                                                                                            < div className = "p-6 space-y-4" >
                                                                                                            {
                                                                                                                riskZones.map((zone, index) => (
                                                                                                                    <div key= { index } className = "border border-gray-200 rounded-lg p-4" >
                                                                                                                    <div className="flex justify-between items-center mb-2" >
                                                                                                                <h3 className="font-medium text-gray-900 text-sm" > { zone.zone } </h3>
                                                                                                                < span className = "text-xs font-medium text-gray-600" > { zone.riskLevel } % </span>
                                                                                                                </div>
                                                                                                                < div className = "w-full bg-gray-200 rounded-full h-2 mb-2" >
                                                                                                                <div 
                    className={`h-2 rounded-full ${zone.riskLevel >= 80 ? 'bg-red-500' : zone.riskLevel >= 60 ? 'bg-orange-500' : 'bg-yellow-500'}`}
    style = {{ width: `${zone.riskLevel}%` }
}
                  > </div>
    </div>
    < p className = "text-xs text-gray-600" > { zone.reports } signalements actifs </p>
        </div>
            ))}
</div>
    </div>

{/* Dangerous Waste Types */ }
<div className="bg-white rounded-xl shadow-sm" >
    <div className="p-6 border-b border-gray-200" >
        <h2 className="text-lg font-semibold text-gray-900" > Types de Déchets Dangereux </h2>
            </div>
            < div className = "p-6 space-y-3" >
            {
                wasteTypes.map((waste, index) => (
                    <div key= { index } className = {`border rounded-lg p-4 ${getRiskLevelColor(waste.riskLevel)}`} >
                <div className="flex justify-between items-center mb-1" >
                    <h3 className="font-medium text-sm" > { waste.type } </h3>
                        < span className = "text-sm font-bold" > { waste.count } </span>
                            </div>
                            < p className = "text-xs opacity-75" > { waste.description } </p>
                                </div>
            ))}
</div>
    </div>
    </div>
    </div>
  );

const renderAgents = () => (
    <div className= "bg-white rounded-xl shadow-sm" >
    <div className="p-6 border-b border-gray-200" >
        <div className="flex justify-between items-center" >
            <h2 className="text-lg font-semibold text-gray-900" > Agents de Ramassage </h2>
                < button
onClick = {() => setShowAddAgentModal(true)}
className = "flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
    >
    <UserPlus className="w-4 h-4" />
        <span>Ajouter Agent </span>
            </button>
            </div>
            </div>

            < div className = "p-6" >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" >
                {
                    agents.map((agent) => (
                        <div key= { agent.id } className = "border border-gray-200 rounded-lg p-4" >
                        <div className="flex justify-between items-start mb-3" >
                    <div>
                    <h3 className="font-medium text-gray-900" > { agent.name } </h3>
                    < p className = "text-sm text-gray-600" > { agent.zone } </p>
                    </div>
                    < span className = {`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`} >
                    { agent.status === 'active' ? 'Actif' : 'Inactif' }
                    </span>
                    </div>

                    < div className = "space-y-2 text-sm text-gray-600" >
                        <p>📞 { agent.phone } </p>
                            <p>✅ { agent.tasksCompleted } tâches terminées </p>
                                </div>

                                < button
onClick = {() => toggleAgentStatus(agent.id)}
className = {`mt-3 w-full px-3 py-2 rounded-lg text-sm font-medium ${agent.status === 'active'
    ? 'bg-red-100 text-red-700 hover:bg-red-200'
    : 'bg-green-100 text-green-700 hover:bg-green-200'
    }`}
              >
    { agent.status === 'active' ? 'Désactiver' : 'Activer' }
    </button>
    </div>
          ))}
</div>
    </div>

{/* Add Agent Modal */ }
{
    showAddAgentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" >
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4" >
                <div className="flex justify-between items-center mb-4" >
                    <h3 className="text-lg font-semibold" > Ajouter un Agent </h3>
                        < button onClick = {() => setShowAddAgentModal(false)
}>
    <X className="w-5 h-5" />
        </button>
        </div>

        < div className = "space-y-4" >
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" > Nom complet </label>
                < input
type = "text"
value = { newAgent.name }
onChange = {(e) => setNewAgent({ ...newAgent, name: e.target.value })}
className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
placeholder = "Ex: Marie Kouassi"
    />
    </div>

    < div >
    <label className="block text-sm font-medium text-gray-700 mb-1" > Téléphone </label>
        < input
type = "tel"
value = { newAgent.phone }
onChange = {(e) => setNewAgent({ ...newAgent, phone: e.target.value })}
className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
placeholder = "+225 07 12 34 56"
    />
    </div>

    < div >
    <label className="block text-sm font-medium text-gray-700 mb-1" > Zone d'affectation</label>
        < select
value = { newAgent.zone }
onChange = {(e) => setNewAgent({ ...newAgent, zone: e.target.value })}
className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
    >
    <option value="Zone A" > Zone A - Centre Ville </option>
        < option value = "Zone B" > Zone B - Quartier Nord </option>
            < option value = "Zone C" > Zone C - Zone Industrielle </option>
                < option value = "Zone D" > Zone D - Banlieue Sud </option>
                    </select>
                    </div>
                    </div>

                    < div className = "flex space-x-3 mt-6" >
                        <button
                onClick={ () => setShowAddAgentModal(false) }
className = "flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
    >
    Annuler
    </button>
    < button
onClick = { handleAddAgent }
className = "flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
    >
    Ajouter
    </button>
    </div>
    </div>
    </div>
      )}
</div>
  );

const renderAccounts = () => (
    <div className= "bg-white rounded-xl shadow-sm" >
    <div className="p-6 border-b border-gray-200" >
        <div className="flex justify-between items-center" >
            <h2 className="text-lg font-semibold text-gray-900" > Gestion des Comptes </h2>
                < button
onClick = {() => setShowAddAccountModal(true)}
className = "flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
    >
    <Plus className="w-4 h-4" />
        <span>Nouveau Compte </span>
            </button>
            </div>
            </div>

            < div className = "overflow-x-auto" >
                <table className="w-full" >
                    <thead className="bg-gray-50" >
                        <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" > Utilisateur </th>
                            < th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" > Rôle </th>
                                < th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" > Statut </th>
                                    < th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" > Dernière connexion </th>
                                        < th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" > Actions </th>
                                            </tr>
                                            </thead>
                                            < tbody className = "divide-y divide-gray-200" >
                                            {
                                                accounts.map((account) => (
                                                    <tr key= { account.id } >
                                                    <td className="px-6 py-4" >
                                                <div>
                                                <div className="text-sm font-medium text-gray-900" > { account.username } </div>
                                                < div className = "text-sm text-gray-500" > { account.email } </div>
                                                </div>
                                                </td>
                                                < td className = "px-6 py-4" >
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${account.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                                    account.role === 'supervisor' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`} >
                                            {
                                                account.role === 'admin' ? 'Administrateur' :
                                                    account.role === 'supervisor' ? 'Superviseur' : 'Agent'
                                            }
                                                </span>
                                                </td>
                                                < td className = "px-6 py-4" >
                                                    <span className={ `px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(account.status)}` }>
                                                        { account.status === 'active' ? 'Actif' : 'Inactif' }
                                                        </span>
                                                        </td>
                                                        < td className = "px-6 py-4 text-sm text-gray-500" >
                                                            { account.lastLogin }
                                                            </td>
                                                            < td className = "px-6 py-4" >
                                                                <button
                    onClick={ () => toggleAccountStatus(account.id) }
className = {`px-3 py-1 rounded text-xs font-medium ${account.status === 'active'
    ? 'bg-red-100 text-red-700 hover:bg-red-200'
    : 'bg-green-100 text-green-700 hover:bg-green-200'
    }`}
                  >
    { account.status === 'active' ? 'Désactiver' : 'Activer' }
    </button>
    </td>
    </tr>
            ))}
</tbody>
    </table>
    </div>

{/* Add Account Modal */ }
{
    showAddAccountModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" >
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4" >
                <div className="flex justify-between items-center mb-4" >
                    <h3 className="text-lg font-semibold" > Créer un Compte </h3>
                        < button onClick = {() => setShowAddAccountModal(false)
}>
    <X className="w-5 h-5" />
        </button>
        </div>

        < div className = "space-y-4" >
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" > Nom d'utilisateur</label>
                < input
type = "text"
value = { newAccount.username }
onChange = {(e) => setNewAccount({ ...newAccount, username: e.target.value })}
className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
placeholder = "Ex: marie.kouassi"
    />
    </div>

    < div >
    <label className="block text-sm font-medium text-gray-700 mb-1" > Email </label>
        < input
type = "email"
value = { newAccount.email }
onChange = {(e) => setNewAccount({ ...newAccount, email: e.target.value })}
className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
placeholder = "marie@waste.cm"
    />
    </div>

    < div >
    <label className="block text-sm font-medium text-gray-700 mb-1" > Rôle </label>
        < select
value = { newAccount.role }
onChange = {(e) => setNewAccount({ ...newAccount, role: e.target.value as 'admin' | 'agent' | 'supervisor' })}
className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
    <option value="agent" > Agent </option>
        < option value = "supervisor" > Superviseur </option>
            < option value = "admin" > Administrateur </option>
                </select>
                </div>

                < div >
                <label className="block text-sm font-medium text-gray-700 mb-1" > Mot de passe </label>
                    < div className = "relative" >
                        <input
                    type={ showPasswords[0] ? "text" : "password" }
value = { newAccount.password }
onChange = {(e) => setNewAccount({ ...newAccount, password: e.target.value })}
className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
placeholder = "Mot de passe"
    />
    <button
                    type="button"
onClick = {() => togglePasswordVisibility(0)}
className = "absolute right-3 top-1/2 transform -translate-y-1/2"
    >
    { showPasswords[0]?<EyeOff className = "w-4 h-4" /> : <Eye className="w-4 h-4" />}
</button>
    </div>
    </div>
    </div>

    < div className = "flex space-x-3 mt-6" >
        <button
                onClick={ () => setShowAddAccountModal(false) }
className = "flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
    >
    Annuler
    </button>
    < button
onClick = { handleAddAccount }
className = "flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
    Créer
    </button>
    </div>
    </div>
    </div>
      )}
</div>
  );

return (
    <div className= "min-h-screen bg-gray-50" >
    {/* Header */ }
    < header className = "bg-white shadow-sm border-b" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
            <div className="flex justify-between items-center h-16" >
                <div className="flex items-center space-x-4" >
                    <div className="flex items-center space-x-2" >
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center" >
                            <User className="w-4 h-4 text-white" />
                                </div>
                                < div >
                                <h1 className="text-lg font-semibold text-gray-900" > { personnel.name } </h1>
                                    < p className = "text-sm text-gray-500" > { personnel.role } </p>
                                        </div>
                                        </div>
                                        </div>

                                        < button
onClick = { handleLogout }
className = "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
    >
    <LogOut className="w-4 h-4" />
        <span>Se déconnecter </span>
            </button>
            </div>
            </div>
            </header>

{/* Navigation Tabs */ }
<nav className="bg-white border-b" >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
        <div className="flex space-x-8" >
            <button
              onClick={ () => setActiveTab('dashboard') }
className = {`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'dashboard'
    ? 'border-green-500 text-green-600'
    : 'border-transparent text-gray-500 hover:text-gray-700'
    }`}
            >
    <div className="flex items-center space-x-2" >
        <BarChart3 className="w-4 h-4" />
            <span>Tableau de Bord </span>
                </div>
                </button>

                < button
onClick = {() => setActiveTab('agents')}
className = {`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'agents'
    ? 'border-green-500 text-green-600'
    : 'border-transparent text-gray-500 hover:text-gray-700'
    }`}
            >
    <div className="flex items-center space-x-2" >
        <Users className="w-4 h-4" />
            <span>Agents de Ramassage </span>
                </div>
                </button>

                < button
onClick = {() => setActiveTab('accounts')}
className = {`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'accounts'
    ? 'border-green-500 text-green-600'
    : 'border-transparent text-gray-500 hover:text-gray-700'
    }`}
            >
    <div className="flex items-center space-x-2" >
        <Shield className="w-4 h-4" />
            <span>Gestion des Comptes </span>
                </div>
                </button>
                </div>
                </div>
                </nav>

{/* Main Content */ }
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" >
    { activeTab === 'dashboard' && renderDashboard()}
{ activeTab === 'agents' && renderAgents() }
{ activeTab === 'accounts' && renderAccounts() }
</div>
    </div>
  );
};

export default PersonnelDashboard;